package com._5guys.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String pharmacistName;
    private String prescriptionNumber;
    private String patientDetails;
    private String action; // e.g., "Removed expired medication"
    private LocalDateTime timestamp;
}
