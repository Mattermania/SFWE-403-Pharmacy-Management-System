import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePendingAccounts } from "../context/PendingAccountsContext";
import { Container, Title } from "../styles/PageStyles";
import styled from "styled-components";
import axios from "axios";

// Custom styled button component
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
  const { pendingAccounts, approveAccount } = usePendingAccounts(); // Manage pending accounts
  const [lockedAccounts, setLockedAccounts] = useState([]); // Locked accounts list
  const [passwordResetAccounts, setPasswordResetAccounts] = useState([]); // Password reset requests
  const location = useLocation();

  // Fetch locked accounts from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/accounts/locked")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLockedAccounts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching locked accounts:", error);
      });
  }, []);

  // Fetch password reset requests
  useEffect(() => {
    axios
      .get("http://localhost:8080/accounts/reset-requests") // Backend endpoint to fetch reset requests
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPasswordResetAccounts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching password reset requests:", error);
      });
  }, []);

  // Approve a pending account
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
      approveAccount(account.username); // Update pending accounts state
      alert(`Account for ${account.username} approved!`);
    } catch (error) {
      console.error("Error approving account:", error);
      alert("Failed to approve account. Please try again.");
    }
  };

  // Unlock a locked account
  const handleUnlock = async (id) => {
    try {
      await axios.put(`http://localhost:8080/accounts/unlock/${id}`);
      setLockedAccounts((prev) => prev.filter((account) => account.id !== id)); // Remove from locked accounts list
      alert("Account unlocked successfully!");
    } catch (error) {
      console.error("Error unlocking account:", error);
      alert("Failed to unlock account. Please try again.");
    }
  };

  // Reset password for an account
  const handlePasswordReset = async (id) => {
    const newPassword = prompt("Enter a new password:");
    if (!newPassword) {
      alert("Password reset canceled.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/accounts/password/${id}`, null, {
        params: { password: newPassword },
      });
      setPasswordResetAccounts((prev) => prev.filter((account) => account.id !== id)); // Remove from reset requests
      alert("Password reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
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

      {/* Password Reset Requests */}
      <h2>Password Reset Requests</h2>
      {passwordResetAccounts.length === 0 ? (
        <p>No password reset requests.</p>
      ) : (
        <ul>
          {passwordResetAccounts.map((account) => (
            <li key={account.id}>
              <strong>{account.name}</strong> ({account.email}) - Role:{" "}
              {account.role}
              <ActionButton
                onClick={() => handlePasswordReset(account.id)}
                color="#2196f3"
                hoverColor="#1976d2"
              >
                Change Password
              </ActionButton>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ManageRoles;
