package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "inventory")
public class Insurance {

    private String policyNumber;            // Unique policy number for the insurance
    private String insuranceProvider;       // Insurance company name
    private String memberId;                // Member ID, often used in pharmacy claims
    private String groupNumber;             // Group number for insurance plan
    private String planType;                // Type of plan (e.g., HMO, PPO, etc.)
    private double coPayAmount;             // Amount of co-pay the customer must pay
    private LocalDate policyStartDate;      // Date when insurance coverage starts
    private LocalDate policyEndDate;        // Date when insurance coverage ends
}
