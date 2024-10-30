package com._5guys.service;

import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.domain.PrescriptionMedication;
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
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

        if(prescription.getStatus() == "FILLED") {
            return "Prescription already filled.";
        }

        for (PrescriptionMedication prescriptionMedication : prescription.getMedications()) {
            Medication medication = prescriptionMedication.getMedication();
            int quantity = prescriptionMedication.getQuantity();

            // Check if there is enough stock available
            if (!medication.removeInventory(quantity)) {
                prescription.setStatus("BLOCKED");
                return "Not enough stock available for this medication.";
            }
        }

        prescription.setStatus("FILLED");

        return "Prescription filled successfully.";
    }
}
