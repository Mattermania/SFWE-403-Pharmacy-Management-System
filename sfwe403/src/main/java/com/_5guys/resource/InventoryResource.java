package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com._5guys.domain.Medication;
import com._5guys.domain.Stock;
import com._5guys.service.InventoryService;

import java.net.URI;
import java.util.List;

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
    public ResponseEntity<Medication> addInventory(@PathVariable(value = "id") String id, @RequestBody List<Stock> newInventory) {
        Medication medication = inventoryService.addInventory(id, newInventory);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMedication(@PathVariable(value = "id") String id) {
        Medication medication = inventoryService.getMedication(id);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    @GetMapping("name/{name}")
    public ResponseEntity<Medication> getMedicationByName(@PathVariable(value = "name") String name) {
        Medication medication = inventoryService.getMedicationByName(name);
        return medication != null ? ResponseEntity.ok(medication) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable(value = "id") String id) {
        inventoryService.deleteMedication(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }

    @GetMapping("/low-stock-warnings/count")
    public ResponseEntity<Integer> getLowStockWarningsCount() {
        int count = inventoryService.getLowStockWarningsCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/expired-medications/count")
    public ResponseEntity<Integer> getExpiredMedicationsCount() {
        int count = inventoryService.getExpiredMedicationsCount();
        return ResponseEntity.ok(count);
    }
}
