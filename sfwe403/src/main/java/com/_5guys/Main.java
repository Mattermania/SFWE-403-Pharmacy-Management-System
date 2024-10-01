package com._5guys;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        // Database URL
        String url = "jdbc:sqlite:user_accounts.db"; // Specify the database file name here

        // SQL statement for creating a new table
        String sql = "CREATE TABLE IF NOT EXISTS users (" +
                     "username TEXT PRIMARY KEY," +
                     "password TEXT NOT NULL," +
                     "email TEXT NOT NULL" +
                     ");";

        // Establish a connection
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection(url); 
            Statement stmt = conn.createStatement();
            // Create a new table
            stmt.execute(sql);
            System.out.println("Table created successfully");
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
