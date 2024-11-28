package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com._5guys.domain.ActivityLog;
import com._5guys.domain.InventoryLog;
import com._5guys.domain.Log;
import com._5guys.domain.TransactionLog;
import com._5guys.service.LogService;
import org.springframework.data.domain.Page;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class LogResource {
    private final LogService logService;

    @PostMapping
    public ResponseEntity<Log> createLog(@RequestBody Log log) {
        Log createdLog = logService.createLog(log);
        URI location = URI.create(String.format("/Logs/%s", createdLog.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdLog);
    }

    @PostMapping("/transaction")
    public ResponseEntity<Log> createTransactionLog(@RequestBody TransactionLog log) {
        Log createdLog = logService.createLog(log);
        URI location = URI.create(String.format("/Logs/%s", createdLog.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdLog);
    }

    @PostMapping("/activity")
    public ResponseEntity<Log> createActivityLog(@RequestBody ActivityLog log) {
        Log createdLog = logService.createLog(log);
        URI location = URI.create(String.format("/Logs/%s", createdLog.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdLog);
    }

    @PostMapping("/inventory")
    public ResponseEntity<Log> createInventoryLog(@RequestBody InventoryLog log) {
        Log createdLog = logService.createLog(log);
        URI location = URI.create(String.format("/Logs/%s", createdLog.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdLog);
    }

    @GetMapping
    public ResponseEntity<List<Log>> getReportEntries() {
        return ResponseEntity.ok(logService.getAllReportEntries());
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryLog>> getInventoryEntries() {
        return ResponseEntity.ok(logService.getInventoryEntries());
    }
    
    @GetMapping("/activity")
    public ResponseEntity<Page<ActivityLog>> getActivityEntries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ActivityLog> activityLogs = logService.getPaginatedActivityEntries(page, size);
        return ResponseEntity.ok(activityLogs);
    }


    @GetMapping("/transaction")
    public ResponseEntity<List<TransactionLog>> getTransactionEntries() {
        return ResponseEntity.ok(logService.getTransactionEntries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Log> getLog(@PathVariable(value = "id") String id) {
        Log log = logService.getLog(id);
        return log != null ? ResponseEntity.ok(log) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable(value = "id") String id) {
        logService.deleteLog(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }
}
