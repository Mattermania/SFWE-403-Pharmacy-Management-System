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
        URI location = URI.create(String.format("/inventory/%s", createdMedication.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdMedication);
    }

    @GetMapping
    public ResponseEntity<List<Medication>> getMedications() {
        return ResponseEntity.ok(inventoryService.getAllMedications());
    }

    @PostMapping("/addInventory/{id}")
    public ResponseEntity<Medication> addInventory(@PathVariable(value = "id") String id, @RequestBody Map<LocalDate, Integer> newInventory) {
        Medication medication = inventoryService.addInventory(id, newInventory);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMedication(@PathVariable(value = "id") String id) {
        Medication medication = inventoryService.getMedication(id);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable(value = "id") String id) {
        inventoryService.deleteMedication(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }
}
