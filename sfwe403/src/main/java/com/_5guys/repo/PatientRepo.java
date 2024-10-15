package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Patient;

import java.util.Optional;

@Repository
public interface PatientRepo extends JpaRepository<Patient, String> {
    Optional<Patient> findById(String id);
}
