package com._5guys.service;

import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.domain.PrescriptionMedication;
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

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

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepo.findAll(Sort.by("name"));
    }

    public String fillPrescription(String id) {
        Prescription prescription = prescriptionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    
        if (prescription.getStatus().equals("FILLED")) {
            return "Prescription already filled.";
        }
    
        // First, check if all medications have enough stock
        for (PrescriptionMedication prescriptionMedication : prescription.getMedications()) {
            Medication medication = prescriptionMedication.getMedication();
            int quantity = prescriptionMedication.getQuantity();
    
            if (medication.getTotalQuantity() < quantity) {
                prescription.setStatus("BLOCKED");
                return "Not enough stock available for medication: " + medication.getName();
            }
        }
    
        // Deduct stock for each medication after verifying availability
        prescription.getMedications().forEach(prescriptionMedication -> {
            Medication medication = prescriptionMedication.getMedication();
            int quantity = prescriptionMedication.getQuantity();
            medication.removeInventory(quantity);
        });
    
        prescription.setStatus("FILLED");
        return "Prescription filled successfully.";
    }    
}

//New modification below:
// src/main/java/com/_5guys/service/PrescriptionService.java
// Add the following imports
import com._5guys.dto.PrescriptionPurchaseRequest;
import com._5guys.domain.ActivityLog;
import com._5guys.repo.ActivityLogRepo;

// Modify the class to include ActivityLogRepo
@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final PrescriptionRepo prescriptionRepo;
    private final ActivityLogRepo activityLogRepo; // Add this

    // Existing methods...

    // Add the new method
    public String processPrescriptionPurchase(PrescriptionPurchaseRequest request) {
        // Fetch the prescription by ID
        Prescription prescription = getPrescription(request.getPrescriptionId());
        if (prescription == null) {
            throw new RuntimeException("Prescription not found");
        }

        // Ensure the prescription is ready for purchase
        if (!prescription.getStatus().equalsIgnoreCase("FILLED")) {
            throw new RuntimeException("Prescription is not ready for purchase");
        }

        // Check if the customer has confirmed (signed)
        if (!request.isCustomerConfirmed()) {
            throw new RuntimeException("Customer signature is required");
        }

        // Update prescription status to 'PURCHASED'
        prescription.setStatus("PURCHASED");
        prescriptionRepo.save(prescription);

        // Log the purchase action
        ActivityLog log = new ActivityLog();
        log.setPharmacistName(request.getStaffMemberId());
        log.setPrescriptionNumber(prescription.getId());
        log.setPatientDetails(prescription.getPatient().getName());
        log.setAction("Processed prescription purchase");
        log.setTimestamp(LocalDateTime.now());
        activityLogRepo.save(log);

        return "Prescription purchase processed successfully";
    }
}
