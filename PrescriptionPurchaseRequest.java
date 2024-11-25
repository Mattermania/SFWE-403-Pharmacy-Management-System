// src/main/java/com/_5guys/dto/PrescriptionPurchaseRequest.java
package com._5guys.dto;

import lombok.Data;

@Data
public class PrescriptionPurchaseRequest {
    private String prescriptionId;
    private String staffMemberId;
    private String paymentMethod; // "CASH", "DEBIT", or "CREDIT"
    private boolean customerConfirmed;
    private String electronicSignature; // Base64-encoded string of the signature image
}
