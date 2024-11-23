import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Optional: For table styling

const PrescriptionSpecifics = () => {
  const location = useLocation();
  const { prescription } = location.state || {}; // Get prescription data passed from UpdateInventory
  const [newMedication, setNewMedication] = useState({
    medicationName: "",
    quantity: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Use useMemo to compute medicationData from Set
  const medicationData = useMemo(() => {
    if (!prescription) {
      setErrorMessage("Prescription not found.");
      return [];
    }

    if (!prescription.medications) {
      setErrorMessage("No medications available or invalid data format.");
      return [];
    }

    // Convert the Set to an Array
    return Array.from(prescription.medications);
  }, [prescription]);

  const handleAddMedication = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let medicationId;

      // Fetch medication ID based on medication name
      const response = await axios.get(
        `http://localhost:8080/inventory/name/${newMedication.medicationName}`
      );
      if (response.status === 200 && response.data?.id) {
        medicationId = response.data.id;
      } else {
        setErrorMessage("Medication not found.");
        return; // Exit early if the medication is not found
      }

      // Create new prescriptionMedications object
      const newPrescriptionMedicationsData = {
        prescription: {id: prescription.id},
        medication: {id: medicationId},
        quantity: newMedication.quantity,
      };

      // Send prescription data
      const prescriptionResponse = await axios.post(
        "http://localhost:8080/prescriptionMedications",
        newPrescriptionMedicationsData
      );
      if (prescriptionResponse.status === 201) {
        console.log("Medication added:", prescriptionResponse.data);
        setSuccessMessage(`Medication added successfully.`);
      } else {
        setErrorMessage("Error adding medication.");
      }

      setNewMedication({
        medicationName: "",
        quantity: 0,
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrorMessage("Error adding medication.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({ ...newMedication, [name]: value });
  };

  return (
    <div className="excel-table-container">
      <h1>Medication Details: {prescription?.name}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {medicationData.length > 0 ? (
        <table className="excel-table">
          <thead>
            <tr>
              <th>Medications</th>
              <th>Dosage Quantities</th>
            </tr>
          </thead>
          <tbody>
            {medicationData.map((medicationEntry, index) => (
              <tr key={index}>
                <td>{medicationEntry.medication.name}</td>
                <td>{medicationEntry.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medication data available.</p>
      )}

      {/* Add Medication Form */}
      <h3>Add New Medication</h3>
      <label>
        Medication Name:
        <input
          type="text"
          name="medicationName"
          value={newMedication.medicationName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={newMedication.quantity}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddMedication}>Add Medication</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default PrescriptionSpecifics;
