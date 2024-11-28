package com._5guys.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonInclude;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@DiscriminatorValue("InventoryLog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
public class InventoryLog extends Log {
    public enum State {
        CREATED,
        PURCHASED,
        SOLD,
        EXPIRED
    }

    @Column(name = "medication_id", unique = false, updatable = true, nullable = true)
    private String medicationId;

    @Column(name = "quantity_changed", unique = false, updatable = true, nullable = true)
    private int quantityChanged;

    @Column(name = "total_quantity", unique = false, updatable = true, nullable = true)
    private int totalQuantity;

    @Column(name = "state", unique = false, updatable = true, nullable = true)
    private State state;
}
