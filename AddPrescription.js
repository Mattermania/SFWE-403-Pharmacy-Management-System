//src/pages/AddPrescription.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Form, Input, Button } from '../styles/LoginFormStyles';

const AddPrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    customerId: '',
    prescriptionName: '',
    dosage: '',
    frequency: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/prescriptions', prescriptionData);
      alert('Prescription successfully added!');
      navigate('/track-prescriptions');
    } catch (error) {
      alert('Failed to add the prescription. Please try again.');
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Enter Prescription</h2>
        <label>
          Customer ID:
          <Input
            type="text"
            name="customerId"
            value={prescriptionData.customerId}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Prescription Name:
          <Input
            type="text"
            name="prescriptionName"
            value={prescriptionData.prescriptionName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Dosage:
          <Input
            type="text"
            name="dosage"
            value={prescriptionData.dosage}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Frequency:
          <Input
            type="text"
            name="frequency"
            value={prescriptionData.frequency}
            onChange={handleInputChange}
            required
          />
        </label>
        <Button type="submit">Add Prescription</Button>
      </Form>
    </FormContainer>
  );
};

export default AddPrescription;
