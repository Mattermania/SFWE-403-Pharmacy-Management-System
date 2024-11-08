package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.util.Set;
import java.util.HashSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "patients")
public class Patient {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "name", unique = false, updatable = true, nullable = false)
    private String name;
    @Column(name = "date_of_birth", unique = false, updatable = true, nullable = false)
    private LocalDate dateOfBirth;
    @Column(name = "address", unique = false, updatable = true, nullable = false)
    private String address;
    @Column(name = "phone_number", unique = false, updatable = true, nullable = false)
    private String phoneNumber;
    @Column(name = "email", unique = true, updatable = true, nullable = false)
    private String email;
    @Embedded
    private Insurance insurance;
    @OneToMany(mappedBy = "patient", orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Prescription> prescriptions = new HashSet<>(); 

}
