package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com._5guys.domain.ActivityLog;
import java.util.UUID;

@Repository
public interface ActivityLogRepo extends JpaRepository<ActivityLog, UUID> {
    // Additional query methods if needed
}