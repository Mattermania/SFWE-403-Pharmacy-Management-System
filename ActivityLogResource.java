package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com._5guys.domain.ActivityLog;
import com._5guys.service.ActivityLogService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/activity-logs")
@RequiredArgsConstructor
public class ActivityLogResource {
    private final ActivityLogService activityLogService;

    @GetMapping
    public ResponseEntity<Page<ActivityLog>> getActivityLogs(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(activityLogService.getActivityLogs(page, size));
    }
}
