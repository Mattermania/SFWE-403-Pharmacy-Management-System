package com._5guys.resource;

import com._5guys.domain.Prescription;
import com._5guys.service.PrescriptionService;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Add the following imports
import com._5guys.dto.PrescriptionPurchaseRequest;

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
        URI location = URI.create(String.format("/prescriptions/%s", createdPrescription.getId())); // Corrected the URI creation

        return ResponseEntity.created(location).body(createdPrescription);
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getPrescriptions(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
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
  //Added endpoint below to process the purchase
    @PostMapping("/process-purchase")
    public ResponseEntity<String> processPrescriptionPurchase(@RequestBody PrescriptionPurchaseRequest request) {
      try {
          String result = prescriptionService.processPrescriptionPurchase(request);
          return ResponseEntity.ok(result);
      } catch (Exception e) {
          return ResponseEntity.badRequest().body("Error processing purchase: " + e.getMessage());
      }
    }
}
