//src/main/java/com/_5guys/service/UserService.java


package com._5guys.service;

import com._5guys.domain.User;
import com._5guys.dto.LoginRequest;
import com._5guys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final int MAX_ATTEMPTS = 3;

    /**
     * Authenticates a user based on the provided username and password.
     * Throws an exception if the user cannot be found or credentials are incorrect.
     * @param username The username provided for login.
     * @param password The password provided for login.
     * @return The authenticated User object.
     */
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.isLocked()) {
            throw new BadCredentialsException("Account is locked. Please contact admin.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            incrementFailedAttempts(user);
            throw new BadCredentialsException("Invalid credentials");
        }

        resetFailedAttempts(user);
        return user;
    }

    /**
     * Increments the failed login attempts for the user and locks the account if the maximum is reached.
     * @param user The user whose failed attempts are being tracked.
     */
    private void incrementFailedAttempts(User user) {
        user.setFailedAttempts(user.getFailedAttempts() + 1);
        if (user.getFailedAttempts() >= MAX_ATTEMPTS) {
            user.setLocked(true);
        }
        userRepository.save(user);
    }

    /**
     * Resets the failed login attempts for the user after a successful login.
     * @param user The user whose failed attempts should be reset.
     */
    private void resetFailedAttempts(User user) {
        user.setFailedAttempts(0);
        user.setLocked(false);
        userRepository.save(user);
    }

    /**
     * Registers a new user with encoded password and saves it to the database.
     * @param user The user to be registered.
     * @return The registered user.
     */
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFailedAttempts(0);
        user.setLocked(false);
        return userRepository.save(user);
    }

    /**
     * Unlocks a user's account. This can be used by an admin to manually unlock an account.
     * @param username The username of the account to be unlocked.
     */
    public void unlockUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setLocked(false);
        user.setFailedAttempts(0);
        userRepository.save(user);
    }
}
