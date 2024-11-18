package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com._5guys.domain.ActivityLog;

@Repository
public interface ActivityLogRepo extends JpaRepository<ActivityLog, String> {
    // Additional query methods if needed
}
