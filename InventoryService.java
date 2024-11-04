package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com._5guys.domain.Medication;
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

    public Medication getInventory(String id) {
        return inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Medication not found"));
    }

    public Medication createMedication(Medication medication) {
        return inventoryRepo.save(medication);
    }

    public void deleteMedication(Medication medication) {
        // Assignment
    }

    // method ensures that inventory is updated when a prescription is filled, checking if enough stock is available and adjusting quantities accordingly.
    public boolean updateInventoryAfterPrescriptionFill(String medicationId, int quantity) {
    Medication medication = inventoryRepo.findById(medicationId)
            .orElseThrow(() -> new RuntimeException("Medication not found"));
    Map<LocalDate, Integer> inventory = medication.getMedicationInventory();
    int totalAvailable = inventory.values().stream().mapToInt(Integer::intValue).sum();

    if (totalAvailable < quantity) {
        return false; // Not enough stock
    }

    int remainingQuantity = quantity;
    for (Map.Entry<LocalDate, Integer> entry : inventory.entrySet()) {
        if (remainingQuantity == 0) break;
        int available = entry.getValue();
        if (available >= remainingQuantity) {
            inventory.put(entry.getKey(), available - remainingQuantity);
            remainingQuantity = 0;
        } else {
            remainingQuantity -= available;
            inventory.put(entry.getKey(), 0);
        }
    }

    inventoryRepo.save(medication);
    return true; // Inventory updated successfully
    }
    // InventoryService.java

public void receiveMedicines(String medicationId, Map<LocalDate, Integer> newStock) {
    Medication medication = inventoryRepo.findById(medicationId)
            .orElseThrow(() -> new RuntimeException("Medication not found"));

    Map<LocalDate, Integer> currentInventory = medication.getMedicationInventory();

    // Update or add the new stock to the existing inventory
    for (Map.Entry<LocalDate, Integer> entry : newStock.entrySet()) {
        currentInventory.put(entry.getKey(), currentInventory.getOrDefault(entry.getKey(), 0) + entry.getValue());
    }

    // Save the updated medication
    inventoryRepo.save(medication);
}
}
