package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com._5guys.domain.Inventory;
import com._5guys.service.InventoryService;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/inventorys")
@RequiredArgsConstructor
public class InventoryResource {
    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        Inventory createdInventory = inventoryService.createInventory(inventory);
        URI location = URI.create(String.format("/inventorys/%s", createdInventory.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdInventory);
    }

    @GetMapping
    public ResponseEntity<Page<Inventory>> getInventorys(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(inventoryService.getAllInventorys(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventory(@PathVariable(value = "id") String id) {
        Inventory inventory = inventoryService.getInventory(id);
        return inventory != null ? ResponseEntity.ok(inventory) : ResponseEntity.notFound().build();
    }
}
