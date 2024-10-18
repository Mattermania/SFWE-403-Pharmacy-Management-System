//Goes in com_5guys_resource
package com._5guys.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com._5guys.service.UserService;
import com._5guys.domain.User;
import com._5guys.dto.LoginRequest;
import com._5guys.dto.AuthResponse;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user through the UserService
            User user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

            // Check if the user is locked
            if (user.isLocked()) {
                return ResponseEntity.status(HttpStatus.LOCKED).body("Account is locked.");
            }

            // Generate a JWT token or any other authentication token you use
            String token = generateJwtToken(user); // Replace with actual token generation logic
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
