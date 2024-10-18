import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PharmacistContainer, InventoryList, InventoryItem, WarningText, Title, Button } from '../styles/LoginFormStyles';

const Pharmacist = () => {
  const [inventory, setInventory] = useState([]); // Empty array initially
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state

  // Fetch the inventory data from the backend
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory'); // Replace with actual endpoint
      setInventory(response.data); // Set the inventory data from response
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      setError('Error fetching inventory data.');
      setLoading(false); // Stop loading on error
    }
  };

  // Fill prescription by sending a POST request to the backend
  const handleFillPrescription = async (id) => {
    try {
      await axios.post(`http://localhost:8080/prescriptions/fill/${id}`);
      alert(`Prescription filled for item ID: ${id}`);
      fetchInventory(); // Refresh inventory after filling prescription
    } catch (error) {
      alert('Error filling prescription');
    }
  };

  // Run the fetchInventory function once on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) {
    return <p>Loading inventory...</p>; // Display loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Display error if any
  }

  return (
    <PharmacistContainer>
      <Title>Pharmacist Inventory</Title>
      <p>This is where the pharmacist can view and manage the inventory.</p>

      <InventoryList>
        {inventory.map(item => (
          <InventoryItem key={item.id}>
            <span>{item.name} - Quantity: {item.quantity}</span>
            {item.quantity <= 5 && <WarningText>Low Stock!</WarningText>}
            <Button onClick={() => handleFillPrescription(item.id)}>Fill Prescription</Button>
          </InventoryItem>
        ))}
      </InventoryList>
    </PharmacistContainer>
  );
};

export default Pharmacist;