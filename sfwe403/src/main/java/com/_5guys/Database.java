package com._5guys;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

abstract class Database {
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

    protected void createTable(String tableName, String[] properties, String[] values) {
        // Check if the table exists already
        if (doesTableExist(tableName)) {
            System.out.println("Table " + tableName + " already exists.");
            return;
        }

        // Check that the number of columns matches the number of types
        if (properties.length != values.length) {
            throw new IllegalArgumentException("The number of columns and types must match.");
        }

        // Dynamically construct the CREATE TABLE query
        StringBuilder sql = new StringBuilder("CREATE TABLE " + tableName + " (");
        for (int i = 0; i < properties.length; i++) {
            sql.append(properties[i]).append(" ").append(values[i]);
            if (i < properties.length - 1) {
                sql.append(", ");
            }
        }
        sql.append(");");

        // Execute the query to create the table
        try (PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {
            pstmt.executeUpdate();
            System.out.println("Table " + tableName + " created successfully.");

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        }
    }

    protected void deleteTable(String tableName) {
        // Construct the SQL statement for dropping the table
        String sql = "DROP TABLE IF EXISTS " + tableName + ";";

        // Establish connection and execute the statement
        try (Statement stmt = conn.createStatement()) {

            // Execute the DROP TABLE SQL command
            stmt.executeUpdate(sql);
            System.out.println("Table " + tableName + " deleted successfully.");

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        }
    }

    protected void insertElement(String tableName, String[] properties, Object[] values) {
        // Dynamically build the SQL INSERT statement
        StringBuilder sql = new StringBuilder("INSERT INTO " + tableName + " (");
        for (int i = 0; i < properties.length; i++) {
            sql.append(properties[i]);
            if (i < properties.length - 1) {
                sql.append(", ");
            }
        }
        sql.append(") VALUES (");
        for (int i = 0; i < values.length; i++) {
            sql.append("?");
            if (i < values.length - 1) {
                sql.append(", ");
            }
        }
        sql.append(");");

        // Execute the prepared statement
        try (PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {
            // Check that properties and values arrays are of the same length
            if (properties.length != values.length) {
                throw new IllegalArgumentException("Properties and values arrays must have the same length.");
            }

            if (properties.length != countFillableColumns(tableName)) {
                throw new IllegalArgumentException("Properties array must have the same length as fillable table columns.");
            }

            // Set the values dynamically based on their type
            for (int i = 0; i < values.length; i++) {
                if (values[i] instanceof Integer) {
                    pstmt.setInt(i + 1, (Integer) values[i]);
                } else if (values[i] instanceof String) {
                    pstmt.setString(i + 1, (String) values[i]);
                } else if (values[i] instanceof Double) {
                    pstmt.setDouble(i + 1, (Double) values[i]);
                } else if (values[i] instanceof Boolean) {
                    pstmt.setBoolean(i + 1, (Boolean) values[i]);
                } else if (values[i] instanceof java.sql.Date) {
                    pstmt.setDate(i + 1, (java.sql.Date) values[i]);
                } else {
                    throw new IllegalArgumentException("Unsupported data type: " + values[i].getClass());
                }
            }

            // Execute the INSERT query
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("Insert successful. " + affectedRows + " row(s) affected.");
            } else {
                System.out.println("No rows inserted.");
            }

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    protected void deleteElementsByProperties(String tableName, String[] properties, Object[] values) {
        // Construct the SQL DELETE statement dynamically with multiple conditions
        StringBuilder sql = new StringBuilder("DELETE FROM " + tableName + " WHERE ");
        for (int i = 0; i < properties.length; i++) {
            sql.append(properties[i]).append(" = ?");
            if (i < properties.length - 1) {
                sql.append(" AND ");
            }
        }
        sql.append(";");

        // Execute the prepared statement
        try (PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {
            // Validate that properties and values arrays are the same length
            if (properties.length != values.length) {
                throw new IllegalArgumentException("Properties and values arrays must have the same length.");
            }
            
            // Set the values dynamically based on their type
            for (int i = 0; i < values.length; i++) {
                if (values[i] instanceof Integer) {
                    pstmt.setInt(i + 1, (Integer) values[i]);
                } else if (values[i] instanceof String) {
                    pstmt.setString(i + 1, (String) values[i]);
                } else if (values[i] instanceof Double) {
                    pstmt.setDouble(i + 1, (Double) values[i]);
                } else if (values[i] instanceof Boolean) {
                    pstmt.setBoolean(i + 1, (Boolean) values[i]);
                } else {
                    throw new IllegalArgumentException("Unsupported data type: " + values[i].getClass());
                }
            }

            // Execute the DELETE statement
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("Delete successful. " + affectedRows + " row(s) affected.");
            } else {
                System.out.println("No rows matched the condition.");
            }

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    protected List<String[]> searchTableByProperties(String tableName, String[] properties, Object[] values) {
        // Check that properties and values arrays are of the same length
        if (properties.length != values.length) {
            throw new IllegalArgumentException("Properties and values arrays must have the same length.");
        }

        // Dynamically build the SQL SELECT statement
        StringBuilder sql = new StringBuilder("SELECT * FROM " + tableName + " WHERE ");
        for (int i = 0; i < properties.length; i++) {
            sql.append(properties[i]).append(" = ?");
            if (i < properties.length - 1) {
                sql.append(" AND ");
            }
        }
        sql.append(";");

        List<String[]> results = new ArrayList<>();

        // Execute the query
        try (PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {

            // Set the values dynamically based on their type
            for (int i = 0; i < values.length; i++) {
                if (values[i] instanceof Integer) {
                    pstmt.setInt(i + 1, (Integer) values[i]);
                } else if (values[i] instanceof String) {
                    pstmt.setString(i + 1, (String) values[i]);
                } else if (values[i] instanceof Double) {
                    pstmt.setDouble(i + 1, (Double) values[i]);
                } else if (values[i] instanceof Boolean) {
                    pstmt.setBoolean(i + 1, (Boolean) values[i]);
                } else if (values[i] instanceof java.sql.Date) {
                    pstmt.setDate(i + 1, (java.sql.Date) values[i]);
                } else {
                    throw new IllegalArgumentException("Unsupported data type: " + values[i].getClass());
                }
            }

            // Execute the SELECT query
            ResultSet rs = pstmt.executeQuery();

            // Retrieve the result set and store each row in the list
            while (rs.next()) {
                // Assuming the table has N columns, replace 'N' with the actual number of columns
                int columnCount = rs.getMetaData().getColumnCount();
                String[] row = new String[columnCount];
                for (int i = 0; i < columnCount; i++) {
                    row[i] = rs.getString(i + 1);  // Get each column value in the row
                }
                results.add(row);
            }

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        }

        return results;
    }

    protected boolean doesTableExist(String tableName) {
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

    protected int numTableColumns(String tableName) {
        // SQL query to get table information
        String sql = "PRAGMA table_info(" + tableName + ")";

        // Initialize column count
        int columnCount = 0;

        // Establish connection and execute the query
        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            // Iterate through the ResultSet and count the number of columns
            while (rs.next()) {
                columnCount++;
            }

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        }

        return columnCount;
    }

    protected int countFillableColumns(String tableName) {
        int count = 0;

        // PRAGMA to get table schema
        String sql = "PRAGMA table_info(" + tableName + ");";

        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            // Iterate through the table schema
            while (rs.next()) {
                int isPrimaryKey = rs.getInt("pk");
                String defaultValue = rs.getString("dflt_value");

                // Ignore columns that are PRIMARY KEY, AUTOINCREMENT, or have default values
                if (isPrimaryKey == 0 && defaultValue == null) {
                    count++;  // Increment count for fillable columns
                }
            }

        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        }

        return count;
    }
}