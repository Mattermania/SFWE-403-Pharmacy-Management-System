package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

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
    protected String name;
    // @Column(name = "dosage", unique = false, updatable = true, nullable = false)
    // protected int dosage;
    // @Column(name = "dosage_type", unique = false, updatable = true, nullable = false)
    // protected String dosageType;
    // @Column(name = "frequency", unique = false, updatable = true, nullable = false)
    // protected int frequency;
    // @Column(name = "frequency_type", unique = false, updatable = true, nullable = false)
    // protected String frequencyType;
    // @Column(name = "manufacturer", unique = true, updatable = true, nullable = false)
    // protected String manufacturer;
    @Column(name = "quantity", unique = true, updatable = true, nullable = false)
    protected int quantity;
    // @Column(name = "expiration_date", unique = true, updatable = true, nullable = false)
    // protected String expirationDate;
}
