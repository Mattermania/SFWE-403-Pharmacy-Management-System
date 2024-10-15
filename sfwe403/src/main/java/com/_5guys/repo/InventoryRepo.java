package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Inventory;

import java.util.Optional;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    Optional<Inventory> findById(String id);
}
