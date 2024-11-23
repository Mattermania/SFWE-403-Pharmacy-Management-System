// src/main/java/com/_5guys/service/InventoryService.java

package com._5guys.service;

import com._5guys.domain.ActivityLog;
import com._5guys.domain.Medication;
import com._5guys.domain.Stock;
import com._5guys.dto.NonPrescriptionSaleRequest; // Added import
import com._5guys.repo.ActivityLogRepo;
import com._5guys.repo.InventoryRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepo inventoryRepo;
    private final ActivityLogRepo activityLogRepo;
    private final NotificationService notificationService;

    public List<Medication> getAllMedications() {
        return inventoryRepo.findAll(Sort.by("name"));
    }

    public Medication getMedication(String id) {
        return inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Medication not found"));
    }

    public Medication addInventory(String id, List<Stock> newInventory) {
        Optional<Medication> medication = inventoryRepo.findById(id);
        if (medication.isPresent()) {
            // Loop over the entries sorted by date (oldest first)
            for (Stock stock : newInventory) {
                medication.get().addInventory(stock.getExpirationDate(), stock.getQuantity());
            }
            inventoryRepo.save(medication.get());
        } else {
            throw new RuntimeException("Medication not found");
        }
        return medication.get();
    }

    public Medication createMedication(Medication medication) {
        return inventoryRepo.save(medication);
    }

    public void deleteMedication(String id) {
        Medication medication = inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
        inventoryRepo.delete(medication);
    }

    // Method to update inventory after a prescription is filled
    public boolean updateInventoryAfterPrescriptionFill(String medicationId, int quantity) {
        Medication medication = inventoryRepo.findById(medicationId)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
        List<Stock> inventory = medication.getMedication_inventory();
        int totalAvailable = inventory.stream().mapToInt(Stock::getQuantity).sum();

        if (totalAvailable < quantity) {
            return false; // Not enough stock
        }

        int remainingQuantity = quantity;
        for (Stock stock : inventory) {
            if (remainingQuantity == 0) break;
            int available = stock.getQuantity();
            if (available >= remainingQuantity) {
                stock.setQuantity(available - remainingQuantity);
                remainingQuantity = 0;
            } else {
                remainingQuantity -= available;
                stock.setQuantity(0);
            }
        }

        inventoryRepo.save(medication);
        return true; // Inventory updated successfully
    }

    // Method to receive new stock of medicines and update inventory
    public void receiveMedicines(String medicationId, List<Stock> newStock) {
        Medication medication = inventoryRepo.findById(medicationId)
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        List<Stock> inventory = medication.getMedication_inventory();

        // Update or add the new stock to the existing inventory
        for (Stock stock : newStock) {
            boolean updated = false;
            for (Stock existingStock : inventory) {
                if (existingStock.getExpirationDate().equals(stock.getExpirationDate())) {
                    existingStock.setQuantity(existingStock.getQuantity() + stock.getQuantity());
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                inventory.add(stock);
            }
        }

        // Save the updated medication
        inventoryRepo.save(medication);
    }

    // Scheduled method to check for expiring medicines daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkForExpiringMedicines() {
        List<Medication> medications = inventoryRepo.findAll();
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(30);

        Map<String, List<LocalDate>> expiringMedicines = new HashMap<>();

        for (Medication medication : medications) {
            List<Stock> inventory = medication.getMedication_inventory();
            List<Stock> expiredStocks = new ArrayList<>();

            for (Stock stock : inventory) {
                if (stock.getExpirationDate().isBefore(today)) {
                    expiringMedicines.computeIfAbsent(medication.getName(), k -> new ArrayList<>()).add(stock.getExpirationDate());
                    expiredStocks.add(stock);

                    ActivityLog logEntry = new ActivityLog();
                    logEntry.setPharmacistName("System");
                    logEntry.setPrescriptionNumber("N/A");
                    logEntry.setPatientDetails("N/A");
                    logEntry.setAction("Removed expired medication: " + medication.getName());
                    logEntry.setTimestamp(LocalDateTime.now());
                    activityLogRepo.save(logEntry);
                } else if (!stock.getExpirationDate().isAfter(thresholdDate)) {
                    expiringMedicines.computeIfAbsent(medication.getName(), k -> new ArrayList<>()).add(stock.getExpirationDate());
                }
            }

            inventory.removeAll(expiredStocks);
            inventoryRepo.save(medication);
        }

        if (!expiringMedicines.isEmpty()) {
            notificationService.notifyManagerOfExpiringMedicines(expiringMedicines);
        }
    }

    public int getLowStockWarningsCount() {
        int threshold = 5;
        return (int) inventoryRepo.findAll().stream()
                .filter(medication -> medication.getTotalQuantity() <= threshold)
                .count();
    }

    public int getExpiredMedicationsCount() {
        LocalDate currentDate = LocalDate.now();
        return (int) inventoryRepo.findAll().stream()
                .filter(medication -> medication.getMedication_inventory().stream()
                        .anyMatch(stock -> stock.getExpirationDate().isBefore(currentDate)))
                .count();
    }

    // New method added for processing non-prescription sales
    /**
     * Processes the sale of a non-prescription item.
     *
     * @param request The sale request containing medication ID, quantity, staff member ID, and payment method.
     * @return A success message if the sale is processed successfully.
     * @throws RuntimeException if any validation fails.
     */
    public String processNonPrescriptionSale(NonPrescriptionSaleRequest request) {
        Medication medication = getMedication(request.getMedicationId());
        if (medication == null) {
            throw new RuntimeException("Medication not found");
        }

        // Check if the medication requires a prescription
        if (medication.isPrescriptionRequired()) {
            throw new RuntimeException("Medication requires a prescription");
        }

        // Update inventory
        boolean updated = updateInventoryAfterPrescriptionFill(medication.getId(), request.getQuantity());
        if (!updated) {
            throw new RuntimeException("Insufficient stock for medication: " + medication.getName());
        }

        // Log the sale
        ActivityLog log = new ActivityLog();
        log.setPharmacistName(request.getStaffMemberId());
        log.setAction("Sold non-prescription item: " + medication.getName() + ", Quantity: " + request.getQuantity());
        log.setTimestamp(LocalDateTime.now());
        activityLogRepo.save(log);

        return "Non-prescription sale processed successfully";
    }
}
