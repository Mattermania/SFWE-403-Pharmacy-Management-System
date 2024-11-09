package com._5guys.resource;

import com._5guys.domain.Prescription;
import com._5guys.service.PrescriptionService;
import lombok.RequiredArgsConstructor;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionResource {
    private final PrescriptionService prescriptionService;
    // private final PatientService patientService;
    // private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        Prescription createdPrescription = prescriptionService.createPrescription(prescription);
        // Patient existingPatient = patientService.getPatient(prescription.getPatient().getId());
        // createdPrescription.setPatient(existingPatient);
        
        // List<Medication> medicationsToAdd = new ArrayList<>();
        // for (Medication medication : prescription.getMedications()) {
        //     Medication existingMedication = inventoryService.getMedication(medication.getId());
        //     // Only add if not already in the list
        //     if (!createdPrescription.getMedications().contains(existingMedication)) {
        //         medicationsToAdd.add(existingMedication);
        //     }
        // }

        // // After the loop, add all collected medications at once
        // createdPrescription.getMedications().addAll(medicationsToAdd);

        URI location = URI.create(String.format("/prescriptions/%s", createdPrescription.getId())); // Corrected the URI creation

        return ResponseEntity.created(location).body(createdPrescription);
    }

    @GetMapping
    public ResponseEntity<Page<Prescription>> getPrescriptions(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions(page, size));
    }

    @PostMapping("/fill")
    public ResponseEntity<String> fillPrescription(
            @RequestParam("prescriptionId") String prescriptionId) {
        String result = prescriptionService.fillPrescription(prescriptionId);
        if (result.equals("Prescription filled successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}