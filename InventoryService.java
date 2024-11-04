//contains the main business logic for updating inventory. It retrieves the prescription data and adjusts the inventory quantity for each item in the prescription.
package com._5guys.service;

import com._5guys.domain.Inventory;
import com._5guys.domain.Prescription;
import com._5guys.repository.InventoryRepository;
import com._5guys.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final PrescriptionRepository prescriptionRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, PrescriptionRepository prescriptionRepository) {
        this.inventoryRepository = inventoryRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    public void updateInventoryOnPrescriptionFill(Long prescriptionId) {
        Prescription prescription = prescriptionRepository.findById(prescriptionId)
            .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescription.getItems().forEach(item -> {
            Inventory inventoryItem = inventoryRepository.findByName(item.getName())
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

            // Reduce inventory based on the prescription quantity
            inventoryItem.setQuantity(inventoryItem.getQuantity() - item.getQuantity());
            inventoryRepository.save(inventoryItem);
        });
    }
}
