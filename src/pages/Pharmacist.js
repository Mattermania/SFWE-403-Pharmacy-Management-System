import {PharmacistContainer,InventoryList,InventoryItem,WarningText,Title,Button} from '../styles/LoginFormStyles';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

const Pharmacist = () => {
  const [inventory, setInventory] = useState([]); // Empty array initially
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state

  // Function to fetch inventory from server
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory'); // Replace with your actual inventory endpoint
      setInventory(response.data); // Set the inventory data from response
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      setError('Error fetching inventory data.'); // Handle errors
      setLoading(false); // Stop loading on error
    }
  };

  // useEffect to run when component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  const handleFillPrescription = (id) => {
    // Logic to fill prescription (this can be expanded)
    alert(`Filling prescription for item ID: ${id}`);
  };

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