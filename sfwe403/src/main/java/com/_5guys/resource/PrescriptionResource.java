package com._5guys.resource;

import com._5guys.domain.Prescription;
import com._5guys.service.PrescriptionService;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionResource {
    private final PrescriptionService prescriptionService;

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        Prescription createdPrescription = prescriptionService.createPrescription(prescription);
        URI location = URI.create(String.format("/prescriptions/%s", createdPrescription.getId()));
        return ResponseEntity.created(location).body(createdPrescription);
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    // New endpoint to get PAID prescriptions
    @GetMapping("/paid")
    public ResponseEntity<List<Prescription>> getPaidPrescriptions() {
        List<Prescription> paidPrescriptions = prescriptionService.getPrescriptionsByStatus("PAID");
        return ResponseEntity.ok(paidPrescriptions);
    }

    // Get prescription by ID
    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescription(@PathVariable(value = "id") String id) {
        Prescription prescription = prescriptionService.getPrescription(id);
        return prescription != null ? ResponseEntity.ok(prescription) : ResponseEntity.notFound().build();
    }

    @PostMapping("/fill")
    public ResponseEntity<String> fillPrescription(@RequestParam("prescriptionId") String prescriptionId) {
        String result = prescriptionService.fillPrescription(prescriptionId);
        if (result.equals("Prescription filled successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}