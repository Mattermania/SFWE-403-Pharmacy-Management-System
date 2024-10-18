//src/pages/Pharmacist.js 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PharmacistContainer, InventoryList, InventoryItem, WarningText, Title, Button } from '../styles/LoginFormStyles';

const Pharmacist = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory');
      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch inventory data. Please try again later.');
      setLoading(false);
    }
  };

  const handleFillPrescription = async (itemId) => {
    try {
      await axios.post(`http://localhost:8080/prescriptions/fill/${itemId}`);
      alert(`Prescription for item ID: ${itemId} has been filled successfully.`);
      fetchInventory(); // Refresh the inventory after filling a prescription
    } catch (error) {
      alert('Error filling the prescription. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PharmacistContainer>
      <Title>Pharmacist Inventory</Title>
      <InventoryList>
        {inventory.map((item) => (
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
