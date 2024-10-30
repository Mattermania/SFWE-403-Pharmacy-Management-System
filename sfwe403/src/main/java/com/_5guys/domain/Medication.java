package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

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
    @Column(name = "manufacturer", unique = false, updatable = true, nullable = false)
    private String manufacturer;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "medication_inventory", joinColumns = @JoinColumn(name = "medication_id"))
    @MapKeyColumn(name = "expiration_date")
    @Column(name = "quantity")
    private Map<LocalDate, Integer> inventory = new HashMap<>(); 
    @OneToMany(mappedBy = "medication", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference("medicationReference")
    private Set<PrescriptionMedication> prescriptions = new HashSet<>();

    public boolean removeInventory(int quantity) {
        int remainingQuantity = quantity;
    
        // Check if inventory is empty
        if (inventory.isEmpty()) {
            return false; // or throw an exception, depending on your use case
        }
    
        // Loop over the entries sorted by date (oldest first)
        for (Iterator<Map.Entry<LocalDate, Integer>> it = inventory.entrySet().iterator(); it.hasNext() && remainingQuantity > 0;) {
            Map.Entry<LocalDate, Integer> entry = it.next();
            int currentQuantity = entry.getValue();
    
            if (currentQuantity <= remainingQuantity) {
                // Remove entire quantity for this date
                remainingQuantity -= currentQuantity;
                it.remove(); // Remove the entry as quantity reaches zero
            } else {
                // Partially remove quantity from this date
                entry.setValue(currentQuantity - remainingQuantity);
                remainingQuantity = 0;
            }
        }
    
        // Check if we could fully remove the requested quantity
        return remainingQuantity == 0;
    }
    
}
