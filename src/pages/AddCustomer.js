// src/pages/AddCustomer.js
import React, { useState } from "react";
import { FormContainer, Form, Input, Button } from "../styles/LoginFormStyles";

const AddCustomer = () => {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: "", dosage: "", frequency: "" },
  ]);
  const [noInsurance, setNoInsurance] = useState(false);

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { id: prescriptions.length + 1, name: "", dosage: "", frequency: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newPrescriptions = prescriptions.map((prescription, i) =>
      i === index ? { ...prescription, [field]: value } : prescription
    );
    setPrescriptions(newPrescriptions);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
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
            Name: <Input type="text" required />
          </label>
          <label>
            Date of Birth: <Input type="date" required />
          </label>
          <label>
            Address: <Input type="text" required />
          </label>
          <label>
            Email: <Input type="email" required />
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
                Insurance: <Input type="text" required />
              </label>
              <label>
                Policy Number: <Input type="text" required />
              </label>
              <label>
                Member ID: <Input type="text" required />
              </label>
              <label>
                Group Number: <Input type="text" required />
              </label>
              <label>
                Plan Type: <Input type="text" required />
              </label>
              <label>
                Co-Pay Amount: <Input type="number" required />
              </label>
              <label>
                Policy Start Date: <Input type="date" required />
              </label>
              <label>
                Policy End Date: <Input type="date" required />
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
