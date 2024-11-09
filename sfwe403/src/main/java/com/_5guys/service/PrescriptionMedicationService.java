package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.domain.PrescriptionMedication;
import com._5guys.repo.InventoryRepo;
import com._5guys.repo.PrescriptionMedicationRepo;
import com._5guys.repo.PrescriptionRepo;

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
public class PrescriptionMedicationService {
    private final PrescriptionMedicationRepo prescriptionMedicationRepo;
    private final PrescriptionRepo prescriptionRepo;
    private final InventoryRepo inventoryRepo;


    public List<PrescriptionMedication> getAllPrescriptionMedications() {
        return prescriptionMedicationRepo.findAll(Sort.by("name"));
    }

    public PrescriptionMedication getPrescriptionMedication(String id) {
        return prescriptionMedicationRepo.findById(id).orElseThrow(() -> new RuntimeException("PrescriptionMedication not found"));
    }

    public PrescriptionMedication createPrescriptionMedication(PrescriptionMedication prescriptionMedication) {
        // Fetch Prescription and Medication by ID
        Prescription prescription = prescriptionRepo.findById(prescriptionMedication.getPrescription().getId())
            .orElseThrow(() -> new RuntimeException("Prescription not found"));
        
        Medication medication = inventoryRepo.findById(prescriptionMedication.getMedication().getId())
            .orElseThrow(() -> new RuntimeException("Medication not found"));

        // Create a new PrescriptionMedication entity
        PrescriptionMedication newPrescriptionMedication = new PrescriptionMedication();
        newPrescriptionMedication.setPrescription(prescription);
        newPrescriptionMedication.setMedication(medication);
        newPrescriptionMedication.setQuantity(prescriptionMedication.getQuantity());

        // Save the entity
        return prescriptionMedicationRepo.save(newPrescriptionMedication);
    }


    public void deletePrescriptionMedication(String id) {
        PrescriptionMedication prescriptionMedication = prescriptionMedicationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("PrescriptionMedication not found"));
            prescriptionMedicationRepo.delete(prescriptionMedication);
    }
}
