package com._5guys.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Use AUTO or IDENTITY
    private UUID id; // Use UUID for the ID type

    private String pharmacistName;
    private String prescriptionNumber;
    private String patientDetails;
    private String action; // e.g., "Removed expired medication"
    private LocalDateTime timestamp;
}
