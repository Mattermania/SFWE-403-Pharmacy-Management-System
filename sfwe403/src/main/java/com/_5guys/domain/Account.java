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
    public enum State {
        LOCKED,
        FORGOTPASSWORD,
        INACTIVE,
        ACTIVE
    }
    
    public enum Role {
        CASHIER,
        TECHNICIAN,
        PHARMACIST,
        MANAGER
    }

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "username", unique = true, updatable = true, nullable = false)
    private String username;
    @Column(name = "password", unique = true, updatable = true, nullable = false)
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
    @Enumerated(EnumType.STRING)
    @Column(name = "state", unique = false, updatable = true, nullable = false)
    private State state = State.INACTIVE;

    
    private String photoUrl;

    public void setState(String state) {
        switch(state) {
            case "LOCKED":
                this.state = State.LOCKED;
                break;
            case "FORGOTPASSWORD":
                this.state = State.FORGOTPASSWORD;
                break;
            case "ACTIVE":
                this.state = State.ACTIVE;
                break;
            case "INACTIVE":
                this.state = State.INACTIVE;
                break;
            default:
                this.state = State.INACTIVE;
                break;
        }
    }

    public String getState() {
        switch(this.state) {
            case LOCKED:
                return "LOCKED";
            case FORGOTPASSWORD:
                return "FORGOTPASSWORD";
            case ACTIVE:
                return "ACTIVE";
            case INACTIVE:
                return "INACTIVE";
            default:
                return "INACTIVE";
        }
    }
}