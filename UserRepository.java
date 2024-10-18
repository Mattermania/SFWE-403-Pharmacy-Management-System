//src/main/java/com/_5guys/repository/
package com._5guys.repository;

import com._5guys.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
