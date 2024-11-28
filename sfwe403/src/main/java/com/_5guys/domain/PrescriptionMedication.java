package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
public class PrescriptionMedication {
    
    // @EmbeddedId
    // private PrescriptionMedicationId id;
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;

    @ManyToOne
    @JoinColumn(name = "prescription_id", unique = false, updatable = true, nullable = false)
    @JsonBackReference("prescriptionReference")
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "medication_id", unique = false, updatable = true, nullable = false)
    @JsonIgnoreProperties("medicationReference")
    private Medication medication;

    private int quantity;
}
