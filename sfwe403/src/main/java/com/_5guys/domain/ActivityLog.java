package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "activity_log")
public class ActivityLog extends Log {
    public enum STATUS {
        LOGIN,
        LOGOUT
    }
    
    @Column(name = "user_id", unique = false, updatable = true, nullable = false)
    private String userId;

    @Column(name = "status", unique = false, updatable = true, nullable = false)
    private STATUS status;
}
