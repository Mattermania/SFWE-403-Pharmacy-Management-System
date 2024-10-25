package com._5guys.service;

import com._5guys.domain.Medication;
import com._5guys.domain.Patient;
import com._5guys.domain.Prescription;
import com._5guys.repo.InventoryRepo;
import com._5guys.repo.PatientRepo;
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final PatientRepo patientRepo;
    private final InventoryRepo inventoryRepo;
    private final PrescriptionRepo prescriptionRepo;

    public Prescription createPrescription(Prescription prescription) {
        return prescriptionRepo.save(prescription);
    }

    public String fillPrescription(String patientId, String medicationId, int quantity){

        // Find the patient by ID
        Optional<Patient> patientOptional = patientRepo.findById(patientId);
        if (!patientOptional.isPresent()) {
            return "Patient not found";
        }

        Patient patient = patientOptional.get();

        // Find the medication by ID from the inventory
        Optional<Medication> medicationOptional = inventoryRepo.findById(medicationId);
        if (!medicationOptional.isPresent()) {
            return "Medication not found";
        }

        Medication medication = medicationOptional.get();

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
        }

        // Loop through the patient's prescriptions to find if the medication exists
        List<Prescription> prescriptions = patient.getPrescriptions();
        boolean prescriptionFound = false;

        // Iterate through prescriptions to find and update the prescription for this medication
        for (Prescription prescription : prescriptions) {
            List<Medication> prescribedMedications = prescription.getMedications();

            // Check if the current prescription contains the target medication
            for (Medication prescribedMedication : prescribedMedications) {
                if (prescribedMedication.getId().equals(medicationId)) {
                    // Update the quantity of the medication in this prescription
                    prescribedMedication.updateInventory(quantity);
                    prescriptionFound = true;
                    break;
                }
            }

            if (prescriptionFound) {
                break; // Exit the loop if the medication was found and updated
            }
        }

        // Save the updated patient with the new/updated prescription
        patientRepo.save(patient);

        // Save the updated medication inventory
        inventoryRepo.save(medication);

        return "Prescription filled successfully.";
    }
}
