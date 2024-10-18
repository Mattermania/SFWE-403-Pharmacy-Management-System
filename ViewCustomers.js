//  src/pages/ViewCustomers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Button, Table, TableRow } from '../styles/ExcelTableStyles';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/customers');
      setCustomers(response.data);
    } catch (error) {
      setError('Failed to load customers. Please try again later.');
    }
  };

  const handleRemoveCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8080/customers/${customerId}`);
      alert(`Customer with ID ${customerId} has been removed.`);
      fetchCustomers(); // Refresh the list after removing
    } catch (error) {
      alert('Error removing customer. Please try again.');
    }
  };

  return (
    <TableContainer>
      <h2>Customer List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Button onClick={() => handleRemoveCustomer(customer.id)}>Remove</Button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewCustomers;
