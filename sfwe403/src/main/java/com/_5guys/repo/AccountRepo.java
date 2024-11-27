package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Account;
import java.util.List;

import java.util.Optional;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

@Repository
public interface AccountRepo extends JpaRepository<Account, String> {
    @NonNull Optional<Account> findById(@NonNull String id);
    // Find an account by username
     Account findByUsername(String username);

     // Find an account by email
     Account findByEmail(String email);
 
     // **New method to find accounts by role**
     List<Account> findByRole(Account.Role role);

     List<Account> findByAccountLockedTrue();
    
     List<Account> findByPasswordResetRequestedTrue();
}
