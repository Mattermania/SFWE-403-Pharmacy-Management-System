package com._5guys.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "accounts")
public class Account {
    public enum Role {
        cashier,
        staff,
        technician,
        pharmacist,
        manager
    }

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "username", unique = true, updatable = true, nullable = false)
    private String username;
    @Column(name = "password", unique = false, updatable = true, nullable = false)
    private String password;
    @Column(name = "name", unique = false, updatable = true, nullable = false)
    private String name;
    @Column(name = "email", unique = true, updatable = true, nullable = false)
    private String email;
    @Column(name = "phone_number", unique = false, updatable = true, nullable = false)
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    @Column(name = "role", unique = false, updatable = false, nullable = false)
    private Role role;
    
    private String photoUrl;

    // **New fields added for account lockout functionality**

    // Field to track the number of failed login attempts
    @Column(name = "failed_login_attempts", nullable = false)
    private int failedLoginAttempts = 0;

    // Field to indicate whether the account is locked
    @Column(name = "account_locked", nullable = false)
    private boolean accountLocked = false;

    // Existing methods and fields remain unchanged
}