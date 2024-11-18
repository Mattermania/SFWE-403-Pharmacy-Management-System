//Added methods to find an account by username or email. Added methods to update failed login attempts and account lock status.
//Sprint 5: Add a method to find accounts by role

package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com._5guys.domain.Account;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, String> {
    Optional<Account> findById(String id);

    Account findByUsernameAndPassword(String username, String password);

    Account findByEmailAndPassword(String email, String password);

    // **New methods added**

    // Find an account by username
    Optional<Account> findByUsername(String username);

    // Find an account by email
    Optional<Account> findByEmail(String email);

    // **New method to find accounts by role**
    List<Account> findByRole(Account.Role role);
}
