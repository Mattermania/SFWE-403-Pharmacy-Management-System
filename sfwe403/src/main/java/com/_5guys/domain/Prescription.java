package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import com._5guys.domain.Patient;
import com._5guys.domain.Medication;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "prescription")
public class Prescription {
    public enum STATUS {
        AVAILABLE,
        BLOCKED,
        PROCESS,
        PAID,
        FILLED
    }

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "name", unique = false, updatable = true, nullable = false)
    protected String name;
    @Column(name = "description", unique = false, updatable = true, nullable = false)
    private String description;
    @Column(name = "status", unique = false, updatable = true, nullable = false)
    private STATUS status;
    @ManyToOne
    @JoinColumn(name = "patient_id", unique = false, updatable = true, nullable = false)
    private Patient patient;
    @OneToMany(mappedBy = "prescriptions", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Column(name = "medications", unique = false, updatable = true, nullable = false)
    private List<Medication> medications = new ArrayList<>();
}
