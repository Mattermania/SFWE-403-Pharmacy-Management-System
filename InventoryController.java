//This controller provides an endpoint to trigger an inventory update when a prescription is filled. It connects with the InventoryService to execute the business logic for this operation.

package com._5guys.controller;

import com._5guys.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Endpoint to update inventory when a prescription is filled
    @PostMapping("/update/{prescriptionId}")
    public void updateInventoryOnPrescriptionFill(@PathVariable Long prescriptionId) {
        inventoryService.updateInventoryOnPrescriptionFill(prescriptionId);
    }
}
