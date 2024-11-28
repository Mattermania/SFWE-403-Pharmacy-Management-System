package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com._5guys.domain.Medication;
import com._5guys.domain.Stock;
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

    @PostMapping("/updateQuantity")
    public ResponseEntity<String> updateQuantity(@RequestBody Map<String, Object> data) {
    try {
        String medicationId = (String) data.get("medicationId");
        int quantitySold = (Integer) data.get("quantitySold");
        inventoryService.updateInventoryAfterPrescriptionFill(medicationId, quantitySold);
        return ResponseEntity.ok("Inventory updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error updating inventory: " + e.getMessage());
    }
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

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeStockById(@PathVariable("id") String medicationId) {
    try {
        inventoryService.removeStockById(medicationId);
        return ResponseEntity.ok("All stock removed successfully.");
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body("Error removing stock: " + e.getMessage());
    }
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

    // New endpoint to receive medicines and update the inventory
    @PostMapping("/receive")
    public ResponseEntity<String> receiveMedicines(
            @RequestParam("medicationId") String medicationId,
            @RequestBody Map<LocalDate, Integer> newStock) {
        try {
            // Convert Map<LocalDate, Integer> to List<Stock>
            List<Stock> stockList = newStock.entrySet().stream()
                    .map(entry -> {
                        Stock stock = new Stock();
                        stock.setExpirationDate(entry.getKey());
                        stock.setQuantity(entry.getValue());
                        return stock;
                    })
                    .toList();
    
            inventoryService.receiveMedicines(medicationId, stockList);
            return ResponseEntity.ok("Medicines received and inventory updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/expired-quantities")
    public ResponseEntity<String> removeExpiredMedicationQuantities() {
        try {
            inventoryService.removeExpiredMedicationQuantities();
            return ResponseEntity.ok("Expired medication quantities removed successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error removing expired medication quantities: " + e.getMessage());
        }
    }
}
