package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com._5guys.domain.ActivityLog;
import com._5guys.domain.InventoryLog;
import com._5guys.domain.Log;
import com._5guys.domain.TransactionLog;
import com._5guys.repo.LogRepo;

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
public class LogService {
    private final LogRepo logRepo;

    public void logActivity(String userId, ActivityLog.Activity activity) {
        ActivityLog log = new ActivityLog();
        log.setId(UUID.randomUUID().toString());
        log.setDate(LocalDate.now());
        log.setTime(LocalTime.now());
        log.setUserId(userId);
        log.setActivity(activity);
        logRepo.save(log);
    }
    // Paginated activity logs
    public Page<ActivityLog> getPaginatedActivityEntries(int page, int size) {
        return logRepo.findAllByActivityNotNull(PageRequest.of(page, size, Sort.by("date").descending()));
    }

    public List<Log> getAllReportEntries() {
        return logRepo.findAll(Sort.by("id"));
    }

    public List<InventoryLog> getInventoryEntries() {
        return logRepo.findAll(Sort.by("id"))
                    .stream()
                    .filter(log -> log instanceof InventoryLog)
                    .map(log -> (InventoryLog) log)
                    .collect(Collectors.toList());
    }

    public List<ActivityLog> getActivityEntries() {
        return logRepo.findAll(Sort.by("id"))
                    .stream()
                    .filter(log -> log instanceof ActivityLog)
                    .map(log -> (ActivityLog) log)
                    .collect(Collectors.toList());
    }

    public List<TransactionLog> getTransactionEntries() {
        return logRepo.findAll(Sort.by("id"))
                    .stream()
                    .filter(log -> log instanceof TransactionLog)
                    .map(log -> (TransactionLog) log)
                    .collect(Collectors.toList());
    }

    public Log getLog(String id) {
        return logRepo.findById(id).orElseThrow(() -> new RuntimeException("Log not found"));
    }

    public Log createLog(Log log) {
        return logRepo.save(log);
    }


    public void deleteLog(String id) {
        Log log = logRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Log not found"));
            logRepo.delete(log);
    }
}
