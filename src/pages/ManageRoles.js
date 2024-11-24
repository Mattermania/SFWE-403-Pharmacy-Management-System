import React from "react";
import { usePendingAccounts } from "../context/PendingAccountsContext";
import { Container, Title } from "../styles/PageStyles";
import styled from "styled-components";
import axios from "axios";

// Custom button for approval
const ApproveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #45a049;
  }
`;

const ManageRoles = () => {
  const { pendingAccounts, approveAccount } = usePendingAccounts();

  const handleApprove = async (account) => {
    try {
      // Add the approved account to the backend database
      await axios.post("http://localhost:8080/accounts", {
        username: account.username,
        password: account.password,
        email: account.email,
        phoneNumber: account.phoneNumber,
        name: account.name,
        role: account.role,
      });

      // Once successfully added to the backend, remove from pending accounts
      approveAccount(account.username);
      alert(`Account for ${account.username} approved!`);
    } catch (error) {
      console.error("Error approving account:", error);
      alert("Failed to approve account. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Manage Roles</Title>
      {pendingAccounts.length === 0 ? (
        <p>No pending accounts to approve.</p>
      ) : (
        <ul>
          {pendingAccounts.map((account) => (
            <li key={account.username}>
              <strong>{account.name}</strong> ({account.username}) - Role:{" "}
              {account.role}
              <ApproveButton onClick={() => handleApprove(account)}>
                Approve
              </ApproveButton>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ManageRoles;