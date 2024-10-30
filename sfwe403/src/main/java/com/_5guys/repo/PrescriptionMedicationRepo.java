package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.PrescriptionMedication;

import java.util.Optional;

@Repository
public interface PrescriptionMedicationRepo extends JpaRepository<PrescriptionMedication, String> {
    @NonNull Optional<PrescriptionMedication> findById(@NonNull String id);
}
