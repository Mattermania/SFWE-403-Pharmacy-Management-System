package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com._5guys.domain.Log;
import com._5guys.service.LogService;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class LogResource {
    private final LogService logService;

    @PostMapping
    public ResponseEntity<Log> createLog(@RequestBody Log log) {
        Log createdLog = logService.createLog(log);
        URI location = URI.create(String.format("/logs/%s", createdLog.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdLog);
    }

    @GetMapping
    public ResponseEntity<List<Log>> getLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
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
