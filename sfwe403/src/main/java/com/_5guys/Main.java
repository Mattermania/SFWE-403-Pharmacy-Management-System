package com._5guys;

public class Main {
    public static void main(String[] args) {
        Database myDatabase = new Database("user_accounts");
        myDatabase.createTable();
        myDatabase.insertElement("Jane Smith", "Marketing", 55000.00);
        myDatabase.removeElement("name", "Jane Smith");
    }
}
