package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com._5guys.domain.Medication;
import com._5guys.service.InventoryService;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryResource {
    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<Medication> createMedication(@RequestBody Medication medication) {
        Medication createdMedication = inventoryService.createMedication(medication);
        URI location = URI.create(String.format("/inventory/%s", createdMedication.getId()));
        return ResponseEntity.created(location).body(createdMedication);
    }

    @GetMapping
    public ResponseEntity<List<Medication>> getMedications() {
        return ResponseEntity.ok(inventoryService.getAllMedications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medication> getInventory(@PathVariable(value = "id") String id) {
        Medication medication = inventoryService.getInventory(id);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    // New endpoint to receive medicines and update the inventory
    @PostMapping("/receive")
    public ResponseEntity<String> receiveMedicines(
            @RequestParam("medicationId") String medicationId,
            @RequestBody Map<LocalDate, Integer> newStock) {
        try {
            inventoryService.receiveMedicines(medicationId, newStock);
            return ResponseEntity.ok("Medicines received and inventory updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}