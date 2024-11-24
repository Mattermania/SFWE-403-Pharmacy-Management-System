import React, { useEffect, useState } from "react";
import { usePendingAccounts } from "../context/PendingAccountsContext";
import { Container, Title } from "../styles/PageStyles";
import styled from "styled-components";
import axios from "axios";

// Custom buttons for actions
const ActionButton = styled.button`
  background-color: ${(props) => props.color || "#4caf50"};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#45a049"};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ManageRoles = () => {
  const { pendingAccounts, approveAccount } = usePendingAccounts();
  const [lockedAccounts, setLockedAccounts] = useState([]);

  // Fetch locked accounts from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/accounts/locked") // Endpoint for locked accounts
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLockedAccounts(response.data); // Store locked accounts
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching locked accounts:", error);
      });
  }, []);

  const handleApprove = async (account) => {
    try {
      await axios.post("http://localhost:8080/accounts", {
        username: account.username,
        password: account.password,
        email: account.email,
        phoneNumber: account.phoneNumber,
        name: account.name,
        role: account.role,
      });
      approveAccount(account.username);
      alert(`Account for ${account.username} approved!`);
    } catch (error) {
      console.error("Error approving account:", error);
      alert("Failed to approve account. Please try again.");
    }
  };

  const handleUnlock = async (id) => {
    try {
        await axios.put(`http://localhost:8080/accounts/unlock/${id}`);
        setLockedAccounts((prev) =>
            prev.filter((account) => account.id !== id)
        );
        alert("Account unlocked successfully!");
    } catch (error) {
        console.error("Error unlocking account:", error);
        alert("Failed to unlock account. Please try again.");
    }
};

  return (
    <Container>
      <Title>Manage Roles</Title>

      {/* Pending Accounts Section */}
      <h2>Pending Accounts</h2>
      {pendingAccounts.length === 0 ? (
        <p>No pending accounts to approve.</p>
      ) : (
        <ul>
          {pendingAccounts.map((account) => (
            <li key={account.username}>
              <strong>{account.name}</strong> ({account.username}) - Role:{" "}
              {account.role}
              <ActionButton
                onClick={() => handleApprove(account)}
                color="#4caf50"
                hoverColor="#45a049"
              >
                Approve
              </ActionButton>
            </li>
          ))}
        </ul>
      )}

      {/* Locked Accounts Section */}
      <h2>Locked Accounts</h2>
      {lockedAccounts.length === 0 ? (
        <p>No locked accounts to unlock.</p>
      ) : (
        <ul>
          {lockedAccounts.map((account) => (
            <li key={account.id}>
              <strong>{account.name}</strong> ({account.username}) - Role:{" "}
              {account.role}
              <ActionButton
                onClick={() => handleUnlock(account.id)}
                color="#ff5722"
                hoverColor="#e64a19"
              >
                Unlock
              </ActionButton>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ManageRoles;