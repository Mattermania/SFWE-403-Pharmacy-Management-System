// src/pages/AddCustomer.js
import React, { useState } from "react";
import { FormContainer, Form, Input, Button } from "../styles/LoginFormStyles";

const AddCustomer = () => {
  // State for customer information
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
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
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Gather all customer information
    const customerData = {
      name,
      dob,
      address,
      email,
      insurance: noInsurance ? null : insurance,
      policyNumber: noInsurance ? null : policyNumber,
      memberId: noInsurance ? null : memberId,
      groupNumber: noInsurance ? null : groupNumber,
      planType: noInsurance ? null : planType,
      copay: noInsurance ? null : copay,
      policyStartDate: noInsurance ? null : policyStartDate,
      policyEndDate: noInsurance ? null : policyEndDate,
      prescriptions,
      noInsurance,
    };

    // Log the customer data to the console (or send it to a server)
    console.log("Customer Data Submitted:", customerData);

    // You can now use customerData to perform any action, such as sending to a backend
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
