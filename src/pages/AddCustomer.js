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

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Gather all customer information
    const customerData = {
      name: name,
      dateOfBirth: dob,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      insurance: noInsurance
        ? {
            policyNumber: null,
            insuranceProvider: null,
            memberId: null,
            groupNumber: null,
            planType: null,
            coPayAmount: null,
            policyStartDate: null,
            policyEndDate: null
          }
        : {
            insuranceProvider: insurance,  
            policyNumber: policyNumber,
            memberId: memberId,
            groupNumber: groupNumber,
            planType: planType,
            coPayAmount: copay,
            policyStartDate: policyStartDate,
            policyEndDate: policyEndDate
          },
      noInsurance,
    };

    try {
      const response = await axios.post('http://localhost:8080/patients', customerData);

      if (response.status === 201) {
        console.log("Patient created:", response.data);
        setSuccessMessage("Patient created successfully.");
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage("Error creating patient." + response.status);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setSuccessMessage('');
      setErrorMessage("Error submitting request: " + error.message);
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
                Provider:{" "}
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

          <Button type="submit">Submit</Button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddCustomer;
