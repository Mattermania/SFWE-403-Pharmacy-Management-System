package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "prescription_log")
public class PrescriptionLog extends Log {
    @Column(name = "pharmacist_id", unique = false, updatable = true, nullable = false)
    private String pharmacistId;

    @Column(name = "prescription_id", unique = false, updatable = true, nullable = false)
    private String prescriptionId;

    @Column(name = "patient_id", unique = false, updatable = true, nullable = false)
    private String patientId;

    @Column(name = "medications")
    private Map<String, Integer> medications = new HashMap<>(); 
}
