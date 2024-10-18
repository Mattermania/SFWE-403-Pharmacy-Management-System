// src/pages/AddCustomer.js
import React, { useState } from "react";
import axios from 'axios';
import { FormContainer, Form, Input, Button } from "../styles/LoginFormStyles";

const AddCustomer = () => {
  // State for customer information
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [insurance, setInsurance] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [memberId, setMemberId] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [planType, setPlanType] = useState("");
  const [copay, setCopay] = useState("");
  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyEndDate, setPolicyEndDate] = useState("");
  const [noInsurance, setNoInsurance] = useState(false);

  // State for prescriptions
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: "", dosage: "", frequency: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to add another prescription field
  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { id: prescriptions.length + 1, name: "", dosage: "", frequency: "" },
    ]);
  };

  // Function to handle prescription input change
  const handleInputChange = (index, field, value) => {
    const newPrescriptions = prescriptions.map((prescription, i) =>
      i === index ? { ...prescription, [field]: value } : prescription
    );
    setPrescriptions(newPrescriptions);
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Gather all customer data (including insurance and prescriptions)
    const customerData = {
      name,
      dateOfBirth: dob,
      address,
      phoneNumber,
      email,
      insurance: noInsurance ? {
        policyNumber: null,
        insuranceProvider: null,
        memberId: null,
        groupNumber: null,
        planType: null,
        coPayAmount: null,
        policyStartDate: null,
        policyEndDate: null
      } : {
        policyNumber: policyNumber,
        insuranceProvider: insurance,
        memberId: memberId,
        groupNumber: groupNumber,
        planType: planType,
        coPayAmount: copay,
        policyStartDate: policyStartDate,
        policyEndDate: policyEndDate
      },
      prescriptionStatus: "AVAILABLE",
      prescriptions: prescriptions.reduce((acc, prescription) => {
        acc[prescription.name] = parseInt(prescription.quantity || 0); // assuming the prescription 'name' is unique and 'quantity' is stored
        return acc;
      }, {}),
      noInsurance
    };
  
    try {
      const response = await axios.post('http://localhost:8080/patients', customerData);
  
      if (response.status === 200) {
        // Handle success
        console.log("Patient created:", response.data);
      } else {
        // Handle error
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <FormContainer
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <h2 style={{ textAlign: "center" }}>Add New Customer</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {loading && <p>Loading...</p>}

          <label>
            Name:{" "}
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Date of Birth:{" "}
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </label>
          <label>
            Address:{" "}
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Email:{" "}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Phone Number:{" "}
            <Input
              type="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>

          <label>
            No Insurance:
            <input
              type="checkbox"
              checked={noInsurance}
              onChange={() => setNoInsurance(!noInsurance)}
            />
          </label>

          {!noInsurance && (
            <>
              <label>
                Insurance:{" "}
                <Input
                  type="text"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  required
                />
              </label>
              <label>
                Policy Number:{" "}
                <Input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Member ID:{" "}
                <Input
                  type="text"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </label>
              <label>
                Group Number:{" "}
                <Input
                  type="text"
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Plan Type:{" "}
                <Input
                  type="text"
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  required
                />
              </label>
              <label>
                Co-Pay Amount:{" "}
                <Input
                  type="number"
                  value={copay}
                  onChange={(e) => setCopay(e.target.value)}
                  required
                />
              </label>
              <label>
                Policy Start Date:{" "}
                <Input
                  type="date"
                  value={policyStartDate}
                  onChange={(e) => setPolicyStartDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Policy End Date:{" "}
                <Input
                  type="date"
                  value={policyEndDate}
                  onChange={(e) => setPolicyEndDate(e.target.value)}
                  required
                />
              </label>
            </>
          )}

          <h3>Prescriptions</h3>
          {prescriptions.map((prescription, index) => (
            <div
              key={prescription.id}
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label>
                Name:{" "}
                <Input
                  type="text"
                  value={prescription.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </label>
              <label>
                Dosage:{" "}
                <Input
                  type="text"
                  value={prescription.dosage}
                  onChange={(e) =>
                    handleInputChange(index, "dosage", e.target.value)
                  }
                />
              </label>
              <label>
                Frequency:{" "}
                <Input
                  type="text"
                  value={prescription.frequency}
                  onChange={(e) =>
                    handleInputChange(index, "frequency", e.target.value)
                  }
                />
              </label>
            </div>
          ))}

          <Button type="button" onClick={handleAddPrescription}>
            + Add Another Prescription
          </Button>
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddCustomer;
