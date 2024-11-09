package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Prescription;

import java.util.Optional;

@Repository
public interface PrescriptionRepo extends JpaRepository<Prescription, String> {
    @NonNull Optional<Prescription> findById(@NonNull String id);
}
