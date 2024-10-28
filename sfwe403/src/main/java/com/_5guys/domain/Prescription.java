package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.Set;
import java.util.HashSet;

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
    @JsonBackReference
    private Patient patient;
    @OneToMany(orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Medication> medications = new HashSet<>();
}
