//This component allows managers to view all locked accounts and unlock them.

// src/pages/UnlockAccounts.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PharmacistContainer, Title, Button } from '../styles/LoginFormStyles';

const UnlockAccounts = () => {
  const [lockedAccounts, setLockedAccounts] = useState([]);
  const [managerId, setManagerId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch locked accounts from the server
  const fetchLockedAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/accounts', {
        params: { page: 0, size: 100 }
      });
      const allAccounts = response.data.content;
      const locked = allAccounts.filter(account => account.accountLocked);
      setLockedAccounts(locked);
    } catch (error) {
      setError('Error fetching locked accounts.');
    }
  };

  useEffect(() => {
    fetchLockedAccounts();
  }, []);

  // Handle unlock account action
  const handleUnlock = async (accountId) => {
    try {
      // Assuming managerId is stored in state or retrieved from session
      // For simplicity, we'll prompt for managerId
      const managerIdInput = prompt('Enter your Manager ID:');
      if (!managerIdInput) {
        alert('Manager ID is required to unlock an account.');
        return;
      }
      setManagerId(managerIdInput);

      const response = await axios.put(`http://localhost:8080/accounts/unlock/${accountId}`, null, {
        params: { managerId: managerIdInput }
      });

      if (response.status === 200) {
        setSuccess(`Account ${accountId} unlocked successfully.`);
        // Refresh the list of locked accounts
        fetchLockedAccounts();
      } else {
        setError('Failed to unlock the account.');
      }
    } catch (error) {
      setError('Error unlocking the account.');
    }
  };

  return (
    <PharmacistContainer>
      <Title>Unlock User Accounts</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {lockedAccounts.length > 0 ? (
        <table className="excel-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Failed Attempts</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lockedAccounts.map(account => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.failedLoginAttempts}</td>
                <td>
                  <Button onClick={() => handleUnlock(account.id)}>Unlock</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No locked accounts found.</p>
      )}
    </PharmacistContainer>
  );
};

export default UnlockAccounts;
