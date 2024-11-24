package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.UuidGenerator;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("Log")
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME, 
    include = JsonTypeInfo.As.PROPERTY, 
    property = "logType"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = TransactionLog.class, name = "transaction"),
    @JsonSubTypes.Type(value = ActivityLog.class, name = "activity"),
    @JsonSubTypes.Type(value = InventoryLog.class, name = "inventory")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "logs")
public abstract class Log implements Serializable {
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

}
