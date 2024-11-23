package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
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
    
}
