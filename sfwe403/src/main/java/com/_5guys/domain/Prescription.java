package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.Set;
import java.util.HashSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "prescription")
public class Prescription {

    public enum STATUS {
        AVAILABLE, BLOCKED, PROCESS, PAID, FILLED, NULL;

        @Override
        @JsonValue
        public String toString() {
            return name();
        }

        @JsonCreator
        public static STATUS fromString(String status) {
            for (STATUS s : STATUS.values()) {
                if (s.name().equalsIgnoreCase(status)) {
                    return s;
                }
            }
            return NULL;
        }
    }

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;

    @Column(name = "name", unique = false, updatable = true, nullable = false)
    protected String name;

    @Column(name = "description", unique = false, updatable = true, nullable = false)
    private String description;

    @Column(name = "status", unique = false, updatable = true, nullable = false)
    private STATUS status = STATUS.NULL;

    @ManyToOne
    @JoinColumn(name = "patient_id", unique = false, updatable = true, nullable = false)
    @JsonBackReference
    private Patient patient;

    @OneToMany(mappedBy = "prescription", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference("prescriptionReference")
    private Set<PrescriptionMedication> medications = new HashSet<>();

    public void setStatus(String status) {
        switch(status) {
            case "AVAILABLE":
                this.status = STATUS.AVAILABLE;
                break;
            case "BLOCKED":
                this.status = STATUS.BLOCKED;
                break;
            case "PROCESS":
                this.status = STATUS.PROCESS;
                break;
            case "PAID":
                this.status = STATUS.PAID;
                break;
            case "FILLED":
                this.status = STATUS.FILLED;
                break;
            default:
                this.status = STATUS.NULL;
                break;
        }
    }

    public String getStatus() {
        switch(this.status) {
            case AVAILABLE:
                return "AVAILABLE";
            case BLOCKED:
                return "BLOCKED";
            case PROCESS:
                return "PROCESS";
            case PAID:
                return "PAID";
            case FILLED:
                return "FILLED";
            default:
                return "NULL";
        }
    }
}
