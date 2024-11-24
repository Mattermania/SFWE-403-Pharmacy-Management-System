import React, { createContext, useContext, useState } from "react";

const PendingAccountsContext = createContext();

export const PendingAccountsProvider = ({ children }) => {
  const [pendingAccounts, setPendingAccounts] = useState([]);

  const addPendingAccount = (account) => {
    setPendingAccounts((prev) => [...prev, account]);
  };

  const approveAccount = (username) => {
    setPendingAccounts((prev) =>
      prev.filter((account) => account.username !== username)
    );
  };

  return (
    <PendingAccountsContext.Provider
      value={{ pendingAccounts, addPendingAccount, approveAccount }}
    >
      {children}
    </PendingAccountsContext.Provider>
  );
};

export const usePendingAccounts = () => useContext(PendingAccountsContext);