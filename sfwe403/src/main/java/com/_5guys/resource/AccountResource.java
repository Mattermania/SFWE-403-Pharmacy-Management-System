package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account createdAccount = accountService.createAccount(account);
        URI location = URI.create(String.format("/accounts/%s", createdAccount.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdAccount);
    }

    @GetMapping
    public ResponseEntity<Page<Account>> getAccounts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(accountService.getAllAccounts(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable(value = "id") String id) {
        Account account = accountService.getAccount(id);
        return account != null ? ResponseEntity.ok(account) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<Account>> searchAccountByUsernameAndEmail(
            @RequestParam("username") String username,
            @RequestParam("username") String email) {
        
        Optional<Account> account = accountService.findByUsername(username);
        if (account == null) {
            account = accountService.findByEmail(email);
        }
        if (account != null) {
            if (account.get().isAccountLocked()) {
                // Account is locked
                return ResponseEntity.status(423).body(null); // 423 Locked
            } else {
                // Successful login
                return ResponseEntity.ok(account);
            }
        } else {
            // Handle failed login attempt
            accountService.handleFailedLoginAttempt(username);
            return ResponseEntity.status(401).body(null); // 401 Unauthorized
        }
    
        //return account != null ? ResponseEntity.ok(account) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable(value = "id") String id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        // Consider adding error handling here (e.g., invalid file type, size too large)
        try {
            String responseMessage = accountService.uploadPhoto(id, file);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                                 .body("Invalid request: " + e.getMessage());
        }
    }

    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public ResponseEntity<byte[]> getPhoto(@PathVariable("filename") String filename) {
        try {
            byte[] imageBytes = Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
            return ResponseEntity.ok(imageBytes);
        } catch (IOException e) {
            // Handle the case where the file does not exist
            return ResponseEntity.notFound().build();
        }
    }
    
     // **New endpoint to unlock an account**
     @PutMapping("/unlock/{id}")
     public ResponseEntity<String> unlockAccount(@PathVariable("id") String id) {
         accountService.unlockAccount(id);
         return ResponseEntity.ok("Account unlocked successfully.");
     }

    @PutMapping("/password/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable(value = "id") String id, @RequestParam("password") String password) {
        // Consider adding error handling here (e.g., invalid file type, size too large)
        try {
            String responseMessage = accountService.updatePassword(id, password);
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                                 .body("Invalid request: " + e.getMessage());
        }
    }

    @GetMapping("/locked")
public ResponseEntity<List<Account>> getLockedAccounts() {
    List<Account> lockedAccounts = accountService.getLockedAccounts();
    return ResponseEntity.ok(lockedAccounts);
}
    
}
