package com._5guys.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com._5guys.domain.Patient;
import com._5guys.service.PatientService;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientResource {
    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient createdPatient = patientService.createPatient(patient);
        URI location = URI.create(String.format("/patients/%s", createdPatient.getId())); // Corrected the URI creation
        return ResponseEntity.created(location).body(createdPatient);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable(value = "id") String id) {
        Patient patient = patientService.getPatient(id);
        return patient != null ? ResponseEntity.ok(patient) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable(value = "id") String id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content
    }
}
