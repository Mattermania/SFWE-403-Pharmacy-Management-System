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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Stock> medication_inventory = new ArrayList<>(); 
    @OneToMany(mappedBy = "medication", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference("medicationReference")
    private Set<PrescriptionMedication> prescriptions = new HashSet<>();

    public boolean removeInventory(int quantity) {
        int remainingQuantity = quantity;
    
        // Check if medication_inventory is empty
        if (medication_inventory.isEmpty()) {
            return false; // or throw an exception, depending on your use case
        }
    
        // Loop over the entries sorted by date (oldest first)
        for (int i = 0; i < medication_inventory.size(); i++) {
            int currentQuantity = medication_inventory.get(i).getQuantity();
            Stock updatedStock = medication_inventory.get(i);
            updatedStock.setQuantity(currentQuantity - remainingQuantity);
    
            if (remainingQuantity < 0) {
                break;
            }
            else if (currentQuantity <= remainingQuantity) {
                // Remove entire quantity for this date
                remainingQuantity -= currentQuantity;
                medication_inventory.remove(i); // Remove the entry as quantity reaches zero
            } else {
                // Partially remove quantity from this date
                medication_inventory.set(i, updatedStock);
                remainingQuantity = 0;
            }
        }
    
        // Check if we could fully remove the requested quantity
        return remainingQuantity == 0;
    }

    public void removeExpired(LocalDate currentDate) {
        // Check if medication_inventory is empty
        if (medication_inventory.isEmpty()) {
            return;
        }
    
        // Loop over the entries sorted by date (oldest first)
        for (int i = 0; i < medication_inventory.size(); i++) {
            if (currentDate.isAfter(medication_inventory.get(i).getExpirationDate())) {
                medication_inventory.remove(i); // Remove the entry as medications have expired
            } else {
                return;
            }
        }
    }
    
    public void addInventory(LocalDate expirationDate, int quantity) {
        // Loop over the entries sorted by date (oldest first)
        for (int i = 0; i < medication_inventory.size(); i++) {
            if (expirationDate.equals(medication_inventory.get(i).getExpirationDate())) {
                medication_inventory.get(i).setQuantity(medication_inventory.get(i).getQuantity() + quantity); // Remove the entry as medications have expired
                return;
            }
        }

        Stock newStock = new Stock();
        newStock.setExpirationDate(expirationDate);
        newStock.setQuantity(quantity);

        medication_inventory.add(newStock);

        return;
    }
    

    public int getTotalQuantity() {
        int totalQuantity = 0;
        // Loop over the entries sorted by date (oldest first)
        for (int i = 0; i < medication_inventory.size(); i++) {
            totalQuantity += medication_inventory.get(i).getQuantity();
        }
        return totalQuantity;
    }
}