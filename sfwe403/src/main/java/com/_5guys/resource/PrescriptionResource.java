package com._5guys.resource;

import com._5guys.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionResource {
    private final PrescriptionService prescriptionService;

    @PostMapping("/fill")
    public ResponseEntity<String> fillPrescription(
            @RequestParam("patientId") String patientId,
            @RequestParam("medicationId") String medicationId,
            @RequestParam("quantity") int quantity) {
        String result = prescriptionService.fillPrescription(patientId, medicationId, quantity);
        if (result.equals("Prescription filled successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}