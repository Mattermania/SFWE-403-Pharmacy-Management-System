// src/main/java/com/_5guys/service/PrescriptionService.java

package com._5guys.service;

import com._5guys.domain.ActivityLog;
import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.domain.PrescriptionMedication;
import com._5guys.dto.PrescriptionPurchaseRequest;
import com._5guys.repo.ActivityLogRepo;
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils; // Added import for StringUtils
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final PrescriptionRepo prescriptionRepo;
    private final ActivityLogRepo activityLogRepo;

    public Prescription createPrescription(Prescription prescription) {
        return prescriptionRepo.save(prescription);
    }

    public Prescription getPrescription(String id) {
        return prescriptionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepo.findAll(Sort.by("name"));
    }

    public String fillPrescription(String id) {
        Prescription prescription = getPrescription(id);

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

    /**
     * Processes the purchase of a prescription.
     *
     * @param request The purchase request containing prescription ID, staff member ID, payment method, customer confirmation, and electronic signature.
     * @return A success message if the purchase is processed successfully.
     * @throws RuntimeException if any validation fails.
     */
    public String processPrescriptionPurchase(PrescriptionPurchaseRequest request) {
        // Fetch the prescription by ID
        Prescription prescription = getPrescription(request.getPrescriptionId());

        // Ensure the prescription is ready for purchase
        if (!prescription.getStatus().equalsIgnoreCase("FILLED")) {
            throw new RuntimeException("Prescription is not ready for purchase");
        }

        // Check if the customer has confirmed (signed)
        if (StringUtils.isBlank(request.getElectronicSignature()) && !request.isCustomerConfirmed()) {
            throw new RuntimeException("Customer signature is required");
        }

        // If electronic signature is provided, store it in the prescription
        if (StringUtils.isNotBlank(request.getElectronicSignature())) {
            prescription.setElectronicSignature(request.getElectronicSignature());
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
