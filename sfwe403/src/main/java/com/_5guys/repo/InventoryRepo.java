package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Medication;

import java.util.Optional;

@Repository
public interface InventoryRepo extends JpaRepository<Medication, String> {
    @NonNull Optional<Medication> findById(@NonNull String id);
    @NonNull Optional<Medication> findByName(@NonNull String name);
}
