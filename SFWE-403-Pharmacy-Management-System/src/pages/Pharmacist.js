
import {PharmacistContainer,InventoryList,InventoryItem,WarningText,Title,Button} from '../styles/LoginFormStyles';
import React, { useState } from 'react';
const Pharmacist = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Amoxicillin', quantity: 20 },
    { id: 2, name: 'Ibuprofen', quantity: 5 },
    { id: 3, name: 'Lisinopril', quantity: 10 },
  ]);

  const handleFillPrescription = (id) => {
    // Logic to fill prescription (this can be expanded)
    alert(`Filling prescription for item ID: ${id}`);
  };

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