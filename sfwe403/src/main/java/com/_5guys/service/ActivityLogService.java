package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com._5guys.domain.ActivityLog;
import com._5guys.repo.ActivityLogRepo;

@Service
@Transactional
@RequiredArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepo activityLogRepo;

    public Page<ActivityLog> getActivityLogs(int page, int size) {
        return activityLogRepo.findAll(PageRequest.of(page, size));
    }
}
