package com._5guys.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import com._5guys.domain.Log;
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


    public List<Log> getAllReportEntries() {
        return logRepo.findAll(Sort.by("id"));
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
