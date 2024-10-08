package com._5guys;

public class CustomerAccount extends Account {

    public CustomerAccount(String username, String password, String name, String email, String phoneNumber, String address) {
        super(username, password, name, email, phoneNumber, address);
    }

    @Override
    public void accountRole() {
        System.out.println("Customer role: Can view and sign for prescriptions.");
    }

    // Customer-specific methods
    public void signForPurchase() {
        // Logic for signing for purchases
        System.out.println("Customer " + this.name + " signed for the purchase.");
    }
}
