package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com._5guys.domain.Medication;
import com._5guys.domain.Stock;
import com._5guys.repo.InventoryRepo;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepo inventoryRepo;
    private final NotificationService notificationService;
    

    public List<Medication> getAllMedications() {
        return inventoryRepo.findAll(Sort.by("name"));
    }

    public Medication getMedication(String id) {
        return inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Medication not found"));
    }

    public Medication getMedicationByName(String name) {
        return inventoryRepo.findByName(name).orElseThrow(() -> new RuntimeException("Medication not found"));
    }

    public Medication addInventory(String id, List<Stock> newInventory) {
        Optional<Medication> medication = inventoryRepo.findById(id);
        if (medication.isPresent()) {
            // Loop over the entries sorted by date (oldest first)
            for (Stock stock : newInventory) {
                medication.get().addInventory(stock.getExpirationDate(), stock.getQuantity());
            }
        }
        
        return medication.orElseThrow(() -> new RuntimeException("Medication not found"));
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
        List<Stock> inventory = medication.getMedicationInventory();
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

        List<Stock> inventory = medication.getMedicationInventory();

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

    // **Scheduled method to check for expiring medicines daily at midnight**
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkForExpiringMedicines() {
        List<Medication> medications = inventoryRepo.findAll();
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(30);

        Map<String, List<LocalDate>> expiringMedicines = new HashMap<>();

        for (Medication medication : medications) {
            List<Stock> inventory = medication.getMedicationInventory();
            List<Stock> expiredStocks = new ArrayList<>();

            for (Stock stock : inventory) {
                if (stock.getExpirationDate().isBefore(today)) {
                    expiringMedicines.computeIfAbsent(medication.getName(), k -> new ArrayList<>()).add(stock.getExpirationDate());
                    expiredStocks.add(stock);
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
                .filter(medication -> medication.getMedicationInventory().stream()
                        .anyMatch(stock -> stock.getExpirationDate().isBefore(currentDate)))
                .count();
    }


    public void removeStockById(String medicationId) {
        Medication medication = inventoryRepo.findById(medicationId)
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        List<Stock> inventory = medication.getMedicationInventory();

        // Check if any stock exists
        if (inventory.isEmpty()) {
            throw new RuntimeException("No stock found for this medication.");
        }

        // Clear the inventory
        inventory.clear();

        // Save the updated medication
        inventoryRepo.save(medication);
        log.info("All stock removed for medication ID: {}", medicationId);
    }

    public void removeExpiredMedicationQuantities() {
        List<Medication> medications = inventoryRepo.findAll();
        LocalDate today = LocalDate.now();

        for (Medication medication : medications) {
            List<Stock> inventory = medication.getMedicationInventory();

            for (Stock stock : inventory) {
                // Check for expired stock
                if (stock.getExpirationDate().isBefore(today)) {
                    if (stock.getQuantity() > 0) {
                    }
                    // Set the expired stock quantity to 0
                    stock.setQuantity(0);
                }
            }

            // Save the updated medication inventory
            inventoryRepo.save(medication);
        }
    }
    
}
