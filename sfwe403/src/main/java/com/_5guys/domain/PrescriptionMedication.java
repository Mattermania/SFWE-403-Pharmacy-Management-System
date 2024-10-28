// package com._5guys.domain;

// import com.fasterxml.jackson.annotation.JsonInclude;

// import jakarta.persistence.EmbeddedId;
// import jakarta.persistence.Entity;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.MapsId;
// import jakarta.persistence.OneToOne;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

// @Entity
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @JsonInclude(NON_DEFAULT)
// public class PrescriptionMedication {
    
//     @EmbeddedId
//     private PrescriptionMedication id;

//     @OneToOne
//     @MapsId("prescriptionId")
//     @JoinColumn(name = "prescription_id")
//     private Prescription prescription;

//     @ManyToOne
//     @MapsId("medicationId")
//     @JoinColumn(name = "medication_id")
//     private Medication medication;

//     private int quantity;

//     // Constructors, getters, setters
// }
