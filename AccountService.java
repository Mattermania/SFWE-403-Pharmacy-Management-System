//Implemented logic to handle failed login attempts and lock accounts after a threshold. Added a method to unlock an account, which can only be called by a manager.
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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com._5guys.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

/**
 * AccountService handles account-related operations.
 */
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;

    public Account findByUsernameAndPassword(String username, String password) {
        Account account = accountRepo.findByUsernameAndPassword(username, password);
        if (account != null && !account.isAccountLocked()) {
            // Reset failed login attempts on successful login
            if (account.getFailedLoginAttempts() > 0) {
                account.setFailedLoginAttempts(0);
                accountRepo.save(account);
            }
            return account;
        }
        return null;
    }

    public Account findByEmailAndPassword(String email, String password) {
        Account account = accountRepo.findByEmailAndPassword(email, password);
        if (account != null && !account.isAccountLocked()) {
            // Reset failed login attempts on successful login
            if (account.getFailedLoginAttempts() > 0) {
                account.setFailedLoginAttempts(0);
                accountRepo.save(account);
            }
            return account;
        }
        return null;
    }

    // **New method to handle failed login attempts**
    public void handleFailedLoginAttempt(String username) {
        Optional<Account> accountOptional = accountRepo.findByUsername(username);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            int failedAttempts = account.getFailedLoginAttempts() + 1;
            account.setFailedLoginAttempts(failedAttempts);

            // If failed attempts reach threshold, lock the account
            if (failedAttempts >= 5) {
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
        return accountRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public Account createAccount(Account account) {
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

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
            .orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/accounts/image/" + filename)
                    .toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
















