//onnects InventoryService with PrescriptionService to ensure that inventory checks are performed before a prescription is filled.

package com._5guys.service;

import com._5guys.domain.Patient;
import com._5guys.repo.InventoryRepo;
import com._5guys.repo.PatientRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionService {
    private final PatientRepo patientRepo;
    private final InventoryRepo inventoryRepo;
    private final InventoryService inventoryService;

    public String fillPrescription(String patientId, String medicationId, int quantity) {
        Optional<Patient> patientOptional = patientRepo.findById(patientId);
        if (!patientOptional.isPresent()) {
            return "Patient not found";
        }

        Patient patient = patientOptional.get();

        if (!inventoryService.updateInventoryAfterPrescriptionFill(medicationId, quantity)) {
            return "Not enough stock available for this medication.";
        }

        // Update patient's prescription (add or update quantity)
        Map<String, Integer> prescriptions = patient.getPrescriptions();
        prescriptions.put(medicationId, prescriptions.getOrDefault(medicationId, 0) + quantity);
        patientRepo.save(patient);  // Save updated patient

        return "Prescription filled successfully.";
    }
}
