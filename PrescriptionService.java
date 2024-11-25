// src/main/java/com/_5guys/service/PrescriptionService.java

package com._5guys.service;

import com._5guys.domain.ActivityLog;
import com._5guys.domain.Medication;
import com._5guys.domain.Prescription;
import com._5guys.domain.PrescriptionMedication;
import com._5guys.dto.PrescriptionPurchaseRequest; // Added import
import com._5guys.repo.ActivityLogRepo; // Added import
import com._5guys.repo.PrescriptionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final PrescriptionRepo prescriptionRepo;
    private final ActivityLogRepo activityLogRepo; // Added this

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

    // New method added for processing prescription purchases
    /**
     * Processes the purchase of a prescription.
     *
     * @param request The purchase request containing prescription ID, staff member ID, payment method, and customer confirmation.
     * @return A success message if the purchase is processed successfully.
     * @throws RuntimeException if any validation fails.
     */
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

//Include modiciations from below into code above.

// src/main/java/com/_5guys/service/PrescriptionService.java

// Existing imports...

import org.apache.commons.lang3.StringUtils; // Add this import for StringUtils

public class PrescriptionService {
    // Existing code...

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
        if (StringUtils.isBlank(request.getElectronicSignature()) && !request.isCustomerConfirmed()) {
            throw new RuntimeException("Customer signature is required");
        }

        // If electronic signature is provided, store it
        if (StringUtils.isNotBlank(request.getElectronicSignature())) {
            // Save the electronic signature (implementation depends on how you choose to store it)
            // For example, you can save it to the file system or store it in the database
            saveElectronicSignature(prescription.getId(), request.getElectronicSignature());
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

    private void saveElectronicSignature(String prescriptionId, String signatureData) {
        // Implement logic to save the signature data
        // Option 1: Save as a file
        // Option 2: Save in the database
        // For example, saving as a file:
        String filePath = "/path/to/signatures/" + prescriptionId + ".png";
        try {
            byte[] imageBytes = Base64.getDecoder().decode(signatureData.split(",")[1]);
            Files.write(Paths.get(filePath), imageBytes);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save electronic signature", e);
        }
    }
}

//Just do option 2 and save it into the databse.



