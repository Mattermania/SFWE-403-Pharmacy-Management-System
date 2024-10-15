package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com._5guys.domain.Inventory;
import com._5guys.repo.InventoryRepo;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepo inventoryRepo;

    public Page<Inventory> getAllInventorys(int page, int size) {
        return inventoryRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Inventory getInventory(String id) {
        return inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepo.save(inventory);
    }

    public void deleteInventory(Inventory inventory) {
        // Assignment
    }
}
