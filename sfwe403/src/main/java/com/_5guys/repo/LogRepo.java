package com._5guys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com._5guys.domain.Log;

import java.util.Optional;

@Repository
public interface LogRepo extends JpaRepository<Log, String> {
    @NonNull Optional<Log> findById(@NonNull String id);
}
