package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com._5guys.domain.Account;
import com._5guys.service.AccountService;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com._5guys.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountResource {
    private final AccountService accountService;

    // Create a new account
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account createdAccount = accountService.createAccount(account);
        URI location = URI.create(String.format("/accounts/%s", createdAccount.getId()));
        return ResponseEntity.created(location).body(createdAccount);
    }

    // Get all accounts with pagination
    @GetMapping
    public ResponseEntity<Page<Account>> getAccounts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(accountService.getAllAccounts(page, size));
    }

    // Get account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable(value = "id") String id) {
        Account account = accountService.getAccount(id);
        return account != null ? ResponseEntity.ok(account) : ResponseEntity.notFound().build();
    }

    // Search account by username, email, and password
    @GetMapping("/search")
    public ResponseEntity<Account> searchAccountByUsernameEmailAndPassword(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        Account account = accountService.findByUsernameAndPassword(username, password);
        if (account == null) {
            account = accountService.findByEmailAndPassword(email, password);
        }

        if (account != null) {
            if (account.isAccountLocked()) {
                return ResponseEntity.status(423).body(null); // 423 Locked
            } else {
                return ResponseEntity.ok(account); // Successful login
            }
        } else {
            accountService.handleFailedLoginAttempt(username);
            return ResponseEntity.status(401).body(null); // 401 Unauthorized
        }
    }

    // Delete account by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable(value = "id") String id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    // Upload profile photo for an account
    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        try {
            String responseMessage = accountService.uploadPhoto(id, file);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }
    }

    // Retrieve photo for an account
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public ResponseEntity<byte[]> getPhoto(@PathVariable("filename") String filename) {
        try {
            byte[] imageBytes = Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
            return ResponseEntity.ok(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Unlock a locked account
    @PutMapping("/unlock/{id}")
    public ResponseEntity<String> unlockAccount(@PathVariable("id") String id, @RequestParam("managerId") String managerId) {
        Account manager = accountService.getAccount(managerId);
        if (manager.getRole() != Account.Role.manager) {
            return ResponseEntity.status(403).body("Only managers can unlock accounts."); // 403 Forbidden
        }

        accountService.unlockAccount(id);
        return ResponseEntity.ok("Account unlocked successfully.");
    }

    // Update password for an account
    @PutMapping("/password/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable(value = "id") String id, @RequestParam("password") String password) {
        try {
            String responseMessage = accountService.updatePassword(id, password);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }
    }

    // Get locked accounts
    @GetMapping("/locked")
    public ResponseEntity<List<Account>> getLockedAccounts() {
        List<Account> lockedAccounts = accountService.getLockedAccounts();
        return ResponseEntity.ok(lockedAccounts);
    }

    // Forgot password: flag account for reset
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<Account> accountOptional = accountService.findByEmail(email);

        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setPasswordResetRequested(true); // Flag account for reset
            accountService.saveAccount(account); // Save changes to the database
            return ResponseEntity.ok("Password reset request submitted.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found.");
        }
    }

    // Get accounts flagged for password reset
    @GetMapping("/reset-requests")
    public ResponseEntity<List<Account>> getPasswordResetRequests() {
        List<Account> resetRequests = accountService.getPasswordResetRequests();
        return ResponseEntity.ok(resetRequests);
    }
}
