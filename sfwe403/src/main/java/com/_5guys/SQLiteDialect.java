package com._5guys;

import org.hibernate.dialect.Dialect;

public class SQLiteDialect extends Dialect {

    public boolean supportsIdentityColumns() {
        return true;
    }

    @Override
    public boolean hasAlterTable() {
        return false;
    }

    @Override
    public boolean dropConstraints() {
        return false;
    }

    @Override
    public String getDropForeignKeyString() {
        return "";
    }

    @Override
    public String getAddForeignKeyConstraintString(String constraintName, String[] foreignKey, String referencedTable, String[] primaryKey, boolean referencesPrimaryKey) {
        return "";
    }

    @Override
    public String getAddPrimaryKeyConstraintString(String constraintName) {
        return "";
    }

    @Override
    public boolean supportsCascadeDelete() {
        return false;
    }

    @Override
    public String getAddColumnString() {
        return "ADD COLUMN"; // SQLite does not support this, but you can provide a workaround if needed.
    }
}