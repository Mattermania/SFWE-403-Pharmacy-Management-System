//creates a response object to provide clear feedback when updating the inventory.


package com._5guys.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryUpdateResponse {
    private String medicationId;
    private boolean success;
    private String message;
}