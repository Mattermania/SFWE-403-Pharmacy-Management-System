package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "log")
public class Log {
    public enum FIELD {
        ACCOUNT,
        PATIENT,
        MEDICATION,
        PRESCRIPTION
    }
    
    public enum STATUS {
        CREATE,
        DELETE,
        ADD,
        REMOVE
    }
    
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;

    @Column(name = "date", unique = false, updatable = true, nullable = false)
    private LocalDate date;

    @Column(name = "time", unique = false, updatable = true, nullable = false)
    private LocalTime time;

    @Column(name = "user_id", unique = false, updatable = true, nullable = false)
    private String userId;

    @Column(name = "field", unique = false, updatable = true, nullable = false)
    private FIELD field;

    @Column(name = "field_id", unique = false, updatable = true, nullable = false)
    private String fieldId;

    @Column(name = "status", unique = false, updatable = true, nullable = false)
    private STATUS status;
}