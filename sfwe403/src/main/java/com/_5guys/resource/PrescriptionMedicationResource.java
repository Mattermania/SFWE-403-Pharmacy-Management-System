package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com._5guys.domain.PrescriptionMedication;
import com._5guys.service.PrescriptionMedicationService;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescriptionMedications")
@RequiredArgsConstructor
public class PrescriptionMedicationResource {
    private final PrescriptionMedicationService prescriptionMedicationService;

    @PostMapping
    public ResponseEntity<PrescriptionMedication> createPrescriptionMedication(@RequestBody PrescriptionMedication prescriptionMedication) {
        PrescriptionMedication createdPrescriptionMedication = prescriptionMedicationService.createPrescriptionMedication(prescriptionMedication);
        URI location = URI.create(String.format("/prescriptionMedications/%s", createdPrescriptionMedication.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdPrescriptionMedication);
    }

    @GetMapping
    public ResponseEntity<List<PrescriptionMedication>> getPrescriptionMedications() {
        return ResponseEntity.ok(prescriptionMedicationService.getAllPrescriptionMedications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionMedication> getPrescriptionMedication(@PathVariable(value = "id") String id) {
        PrescriptionMedication prescriptionMedication = prescriptionMedicationService.getPrescriptionMedication(id);
        return prescriptionMedication != null ? ResponseEntity.ok(prescriptionMedication) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescriptionMedication(@PathVariable(value = "id") String id) {
        prescriptionMedicationService.deletePrescriptionMedication(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }
}
