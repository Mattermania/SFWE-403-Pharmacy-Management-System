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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "accounts")
public class Account {   
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private String id;
    @Column(name = "username", unique = true, updatable = true, nullable = false)
    protected String username;
    @Column(name = "password", unique = false, updatable = true, nullable = false)
    protected String password;
    @Column(name = "name", unique = false, updatable = true, nullable = false)
    protected String name;
    @Column(name = "email", unique = true, updatable = true, nullable = false)
    protected String email;
    @Column(name = "phone_number", unique = false, updatable = true, nullable = false)
    protected String phoneNumber;
    @Column(name = "address", unique = false, updatable = true, nullable = false)
    protected String address;
    
    private String photoUrl;

    // public Account(String username, String password, String name, String email, String phoneNumber, String address) {
    //     this.username = username;
    //     this.password = password;
    //     this.name = name;
    //     this.email = email;
    //     this.phoneNumber = phoneNumber;
    //     this.address = address;
    // }

    // // Getters and setters
    // public String getUsername() {
    //     return username;
    // }

    // public void setUsername(String username) {
    //     this.username = username;
    // }

    // public String getPassword() {
    //     return password;
    // }

    // public void setPassword(String password) {
    //     this.password = password;
    // }

    // public String getName() {
    //     return name;
    // }

    // public void setName(String name) {
    //     this.name = name;
    // }

    // public String getEmail() {
    //     return email;
    // }

    // public void setEmail(String email) {
    //     this.email = email;
    // }

    // public String getPhoneNumber() {
    //     return phoneNumber;
    // }

    // public void setPhoneNumber(String phoneNumber) {
    //     this.phoneNumber = phoneNumber;
    // }

    // public String getAddress() {
    //     return address;
    // }

    // public void setAddress(String address) {
    //     this.address = address;
    // }

    // // Abstract method for role-specific functionality
    // public abstract void accountRole();
    
    // // Methods for password management
    // public boolean changePassword(String oldPassword, String newPassword) {
    //     if (this.password.equals(oldPassword)) {
    //         this.password = newPassword;
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // public boolean recoverAccount(String email) {
    //     // Logic for recovering the account
    //     return this.email.equals(email);
    // }
}
