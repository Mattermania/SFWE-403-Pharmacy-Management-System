package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Patient;

import java.util.Optional;

@Repository
public interface PatientRepo extends JpaRepository<Patient, String> {
    @NonNull Optional<Patient> findById(@NonNull String id);
    @NonNull Optional<Patient> findByName(@NonNull String name);
}
