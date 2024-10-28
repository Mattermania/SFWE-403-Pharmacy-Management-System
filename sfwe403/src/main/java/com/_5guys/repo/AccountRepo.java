package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Account;

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
    Account findByUsernameAndPassword(String username, String password);
    Account findByEmailAndPassword(String email, String password);
}