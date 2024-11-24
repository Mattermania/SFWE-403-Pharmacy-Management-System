package com._5guys.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com._5guys.domain.Account;
import com._5guys.repo.AccountRepo;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {
    private final AccountRepo accountRepo;

    // **Method to notify the manager of expiring medicines**
    public void notifyManagerOfExpiringMedicines(Map<String, List<LocalDate>> expiringMedicines) {
        // Find the manager account(s)
        List<Account> managers = accountRepo.findByRole(Account.Role.manager);

        if (managers.isEmpty()) {
            log.warn("No manager accounts found to notify.");
            return;
        }

        // Create a notification message
        StringBuilder message = new StringBuilder("The following medicines have expired or are about to expire:\n");
        for (Map.Entry<String, List<LocalDate>> entry : expiringMedicines.entrySet()) {
            message.append("Medication: ").append(entry.getKey()).append("\n");
            for (LocalDate date : entry.getValue()) {
                message.append(" - Expiry Date: ").append(date).append("\n");
            }
        }

        // For each manager, send the notification (here we just log it)
        for (Account manager : managers) {
            log.info("Notification to Manager {}: {}", manager.getEmail(), message.toString());
            // In a real application, you might send an email or push notification here
        }
    }
}
