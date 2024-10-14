package com._5guys.Unused;

import java.util.List;

public class AccountDatabase extends Database {
    AccountDatabase() {
        super("user_accounts");
    }

    public void createTable(String tableName, String[] properties, String[] values) {
        super.createTable(tableName, properties, values);
    }

    public void deleteTable(String tableName) {
        super.deleteTable(tableName);
    }

    public void insertElement(String tableName, String[] properties, Object[] values) {
        super.insertElement(tableName, properties, values);
    }

    public void deleteElementsByProperties(String tableName, String[] properties, Object[] values) {
        super.deleteElementsByProperties(tableName, properties, values);
    }

    public List<String[]> searchTableByProperties(String tableName, String[] properties, Object[] values) {
        return super.searchTableByProperties(tableName, properties, values);
    }

    public boolean doesTableExist(String tableName) {
        return super.doesTableExist(tableName);
    }
}
