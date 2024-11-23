// src/main/java/com/_5guys/dto/NonPrescriptionSaleRequest.java
package com._5guys.dto;

import lombok.Data;

@Data
public class NonPrescriptionSaleRequest {
    private String medicationId;
    private int quantity;
    private String staffMemberId;
    private String paymentMethod; // "CASH", "DEBIT", or "CREDIT"
}
