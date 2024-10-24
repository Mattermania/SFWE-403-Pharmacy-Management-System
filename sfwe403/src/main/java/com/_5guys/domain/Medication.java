package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "inventory")
public class Medication {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "name", unique = true, updatable = true, nullable = false)
    private String name;
    @Column(name = "dosage", unique = false, updatable = true, nullable = false)
    private int dosage;
    @Column(name = "manufacturer", unique = false, updatable = true, nullable = false)
    private String manufacturer;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medication_inventory", joinColumns = @JoinColumn(name = "medication_id"))//could this be medication id ?? for the join column not sure if patient_id
    @MapKeyColumn(name = "expiration_date")
    @Column(name = "quantity")
    private Map<LocalDate, Integer> inventory = new HashMap<>();
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    public Map<LocalDate, Integer> getInventory() {
        return this.inventory;
    }

    public String getId() {
        return this.id;
    } 
}
