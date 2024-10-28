package com._5guys.service;

import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.repo.InventoryRepo;
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final InventoryRepo inventoryRepo;
    private final PrescriptionRepo prescriptionRepo;

    public Prescription createPrescription(Prescription prescription) {
        return prescriptionRepo.save(prescription);
    }

    public Prescription getPrescription(String id) {
        return prescriptionRepo.findById(id).orElseThrow(() -> new RuntimeException("Prescription not found"));
    }

    public Page<Prescription> getAllPrescriptions(int page, int size) {
        return prescriptionRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public String fillPrescription(String id){

        Prescription prescription = prescriptionRepo.findById(id).orElseThrow(() -> new RuntimeException("Prescription not found"));

        // for (PrescriptionMedication prescriptionMedicationId : prescription.getPrescriptionMedications()) {
        //     Medication medication = prescriptionMedicationId.getMedication();
        //     int quantity = prescriptionMedicationId.getQuantity();
        for (Medication medication : prescription.getMedications()) {
            // Medication medication = prescriptionMedicationId.getMedication();
            int quantity = 0;

            // Get the inventory of medication as a map of expiration dates and quantities
            Map<LocalDate, Integer> inventory = medication.getInventory();
            int totalAvailable = inventory.values().stream().mapToInt(Integer::intValue).sum();

            // Check if there is enough stock available
            if (totalAvailable < quantity) {
                return "Not enough stock available for this medication.";
            }

            // Deduct the required quantity from the medication inventory based on expiration date
            int remainingQuantity = quantity;
            for (Map.Entry<LocalDate, Integer> entry : inventory.entrySet()) {
                if (remainingQuantity == 0) break; // Stop once the required quantity is deducted

                int available = entry.getValue();
                if (available >= remainingQuantity) {
                    // Enough stock available from this batch
                    inventory.put(entry.getKey(), available - remainingQuantity);
                    remainingQuantity = 0;
                } else {
                    // Deduct as much as possible from this batch
                    remainingQuantity -= available;
                    inventory.put(entry.getKey(), 0);
                }

                // Save the updated medication inventory
                inventoryRepo.save(medication);
            }
        }

        return "Prescription filled successfully.";
    }
}
