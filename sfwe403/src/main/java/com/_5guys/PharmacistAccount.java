package com._5guys;

public class PharmacistAccount extends Account {

    public PharmacistAccount(String username, String password, String name, String email, String phoneNumber, String address) {
        super(username, password, name, email, phoneNumber, address);
    }

    @Override
    public void accountRole() {
        System.out.println("Pharmacist role: Can check inventory, fill prescriptions, etc.");
    }

    // Pharmacist-specific methods
    public void fillPrescription(String prescriptionId) {
        // Logic for filling prescriptions
        System.out.println("Prescription " + prescriptionId + " filled by " + this.name);
    }

    public void checkInventory(String medicineName) {
        // Logic for checking inventory
        System.out.println("Checking inventory for " + medicineName);
    }
}
