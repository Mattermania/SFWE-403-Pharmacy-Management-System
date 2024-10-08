package com._5guys;

public class StaffAccount extends Account {

    public StaffAccount(String username, String password, String name, String email, String phoneNumber, String address) {
        super(username, password, name, email, phoneNumber, address);
    }

    @Override
    public void accountRole() {
        System.out.println("Staff role: Can create/update patient accounts, process prescriptions.");
    }

    // Staff-specific methods
    public void enterPatientPrescription(String prescriptionDetails) {
        // Logic for entering prescription details
        System.out.println("Prescription entered: " + prescriptionDetails);
    }
}
