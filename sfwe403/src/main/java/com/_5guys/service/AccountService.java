package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com._5guys.domain.Account;
import com._5guys.repo.AccountRepo;

import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com._5guys.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;

    public Account findByUsernameAndPassword(String username, String password) {
        return accountRepo.findByUsernameAndPassword(username, password);
    }

    public Account findByEmailAndPassword(String email, String password) {
        return accountRepo.findByEmailAndPassword(email, password);
    }

    // **New method to handle failed login attempts**
    public void handleFailedLoginAttempt(String username) {
        Optional<Account> accountOptional = accountRepo.findByUsername(username);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            int failedAttempts = account.getFailedLoginAttempts() + 1;
            account.setFailedLoginAttempts(failedAttempts);
    
            if (failedAttempts >= 5) { // Lock after 5 failed attempts
                account.setAccountLocked(true);
                log.warn("Account locked due to too many failed login attempts: {}", username);
            }
            accountRepo.save(account);
        }
    }

    // **New method to unlock an account**
    public void unlockAccount(String id) {
        Account account = accountRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setAccountLocked(false);
        account.setFailedLoginAttempts(0);
        accountRepo.save(account);
    }

    public Page<Account> getAllAccounts(int page, int size) {
        return accountRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Account getAccount(String id) {
        return accountRepo.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public Account createAccount(Account account) {
        account.setFailedLoginAttempts(0); // Initialize failed login attempts
        account.setAccountLocked(false); // Initialize account lock status
        return accountRepo.save(account);
    }

    public void deleteAccount(String id) {
        Account account = accountRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        accountRepo.delete(account);
    }

    public String uploadPhoto(String id, MultipartFile file) {
        log.info("Saving picture for user ID: {}", id);
        Account account = getAccount(id);
        String photoUrl = photoFunction.apply(id, file);
        account.setPhotoUrl(photoUrl);
        accountRepo.save(account);
        return photoUrl;
    }

    public String updatePassword(String id, String password) {
        log.info("Updating password for user ID: {}", id);
        Account account = getAccount(id);
        account.setPassword(password);
        accountRepo.save(account);
        return password;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/accounts/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };

    public List<Account> getLockedAccounts() {
        return accountRepo.findByAccountLockedTrue();
    }
}
















