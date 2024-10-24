// package com._5guys.service;

// import com._5guys.domain.Medication;
// import com._5guys.domain.Patient;
// import com._5guys.domain.Prescription;
// import com._5guys.repo.InventoryRepo;
// import com._5guys.repo.PatientRepo;
// import jakarta.transaction.Transactional;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.util.Map;
// import java.util.List;
// import java.util.Optional;

// @Service
// @RequiredArgsConstructor
// @Transactional
// public class PrescriptionService {
//     private final PatientRepo patientRepo;
//     private final InventoryRepo inventoryRepo;

//     public String fillPrescription(String patientId, String medicationId, int quantity){

//         Optional<Patient> patientOptional = patientRepo.findById(patientId);
//         if(!patientOptional.isPresent()){
//             return "Patient not found";
//         }

//         Patient patient = patientOptional.get();

//         Optional<Medication> medicationOptional = inventoryRepo.findById(medicationId); // look at medication.java not sure if it should be medication id or patient id??
//         if(!medicationOptional.isPresent()){
//             return "Medication not found";
//         }

//         Medication medication = medicationOptional.get();


//         Map<LocalDate,Integer> inventory = medication.getInventory();
//         int totalAvailable = inventory.values().stream().mapToInt(Integer::intValue).sum();

//         if (totalAvailable < quantity) {
//             return "Not enough stock available for this medication.";
//         }

//         int remainingQuantity = quantity;
//         for (Map.Entry<LocalDate, Integer> entry : inventory.entrySet()) {
//             if (remainingQuantity == 0) break;
//             int available = entry.getValue();
//             if (available >= remainingQuantity) {
//                 inventory.put(entry.getKey(), available - remainingQuantity);
//                 remainingQuantity = 0;
//             } else {
//                 remainingQuantity -= available;
//                 inventory.put(entry.getKey(), 0);
//             }
//         }

//         // Update patient's prescription (add or update quantity)
//         List<Prescription> prescriptions = patient.getPrescriptions();
//         prescriptions.put(medicationId, prescriptions.get(medicationId) + quantity);
//         patientRepo.save(patient);  // Save updated patient

//         // Save the updated medication inventory
//         inventoryRepo.save(medication);

//         return "Prescription filled successfully.";



//     }
// }
