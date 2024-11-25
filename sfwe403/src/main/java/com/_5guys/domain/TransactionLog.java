package com._5guys.domain;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonInclude;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Entity
@DiscriminatorValue("TransactionLog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
public class TransactionLog extends Log {
    public enum Payment {
        CREDIT,
        DEBIT,
        CASH
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "purchased_items", joinColumns = @JoinColumn(name = "log_id"))
    private Map<String, Double> purchasedItems = new HashMap<String, Double>();

    @Column(name = "payment_method", unique = false, updatable = true, nullable = true)
    private Payment paymentMethod;

    @Column(name = "payment", unique = false, updatable = true, nullable = true)
    private String payment;

    // Constructors, equals, and hashCode if needed

    public Double getTotalCost() {
        Double totalCost = 0.0;
        
        Iterator<Map.Entry<String, Double>> iterator = purchasedItems.entrySet().iterator();
        // Iterate through the map
        while (iterator.hasNext()) {
            Map.Entry<String, Double> entry = iterator.next();
            Double value = entry.getValue(); // Retrieve the value

            totalCost += value;
        }

        return totalCost;
    }
}
