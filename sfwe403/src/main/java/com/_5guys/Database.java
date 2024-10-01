package com._5guys;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Database {
    Connection conn = null;
    Statement stmt = null;
    String name = "";
    Database(String name) {
        this.name = name;
        // Database URL
        String url = "jdbc:sqlite:" + name + ".db"; // Specify the database file name here

        // Establish a connection
        try {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(url); 
            stmt = conn.createStatement();
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void createTable() {
        if (!doesTableExist("employees")) {
            // SQL statement for creating a new table
            String sql = "CREATE TABLE employees (" +
                        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                        "name TEXT NOT NULL," +
                        "department TEXT," +
                        "salary REAL" +
                        ");";

            try {
                // Create a new table
                stmt.execute(sql);
                System.out.println("Table created successfully");
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
    }

    public void insertElement(String name, String department, double salary) {
        String sql = "INSERT INTO employees(id, name, department, salary) VALUES(?, ?, ?, ?);";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            // Set the values for the placeholders
            pstmt.setString(2, name);
            pstmt.setString(3, department);
            pstmt.setDouble(4, salary);

            // Execute the insert statement
            pstmt.executeUpdate();
            System.out.println("Employee added successfully.");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void removeElement(String property, String data) {
        String sql = "DELETE FROM employees WHERE " + property + " = \"" + data + "\";";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            // Execute the delete statement
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Employee deleted successfully.");
            } else {
                System.out.println("No employee found with " + property + ": " + data);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    private boolean doesTableExist(String tableName) {
        String sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, tableName); // Set the table name
            ResultSet rs = pstmt.executeQuery();
            
            // If the result set has a row, the table exists
            if (rs.next()) {
                return true;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        
        return false;
    }
}
