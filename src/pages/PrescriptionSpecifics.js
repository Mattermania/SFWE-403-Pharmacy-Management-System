import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Optional: For table styling

const PrescriptionSpecifics = () => {
  const location = useLocation();
  const { prescription } = location.state || {}; // Get prescription data passed from ViewInventory
  const [newMedication, setNewMedication] = useState({
    medicationName: "",
    quantity: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [medications, setMedications] = useState([]); // Local state for medications

  // Fetch medications for the prescription
  const fetchMedications = async () => {
    if (!prescription) return; // Exit early if no prescription

    try {
      const response = await axios.get(
        `http://localhost:8080/prescriptions/${prescription.id}`
      );
      if (response.data.medications) {
        setMedications(response.data.medications); // Update the medications state
      } else {
        setMedications([]);
      }
    } catch (error) {
      setErrorMessage("Error fetching medications.");
      console.error("Error fetching medications:", error);
    }
  };

  useEffect(() => {
    // Fetch medications when the component mounts or prescription changes
    fetchMedications();
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

      // Check if the medication is already in the prescription
      for (const medication of medications) {
        if (response.data.id === medication.medication.id) {
          setSuccessMessage("Prescription already contains this medication.");
          return;
        }
      }

      // Create new prescriptionMedications object
      const newPrescriptionMedicationsData = {
        prescription: { id: prescription.id },
        medication: { id: medicationId },
        quantity: newMedication.quantity,
      };

      // Send prescription data
      const prescriptionResponse = await axios.post(
        "http://localhost:8080/prescriptionMedications",
        newPrescriptionMedicationsData
      );
      if (prescriptionResponse.status === 201) {
        // Add the new medication locally
        const updatedMedications = [
          ...medications,
          {
            medication: { id: medicationId, name: newMedication.medicationName },
            quantity: newMedication.quantity,
          },
        ];

        // Update medications state
        setMedications(updatedMedications);

        // Set the success message and clear the input fields
        setSuccessMessage(`Medication added successfully.`);
        setNewMedication({
          medicationName: "",
          quantity: 0,
        });
      } else {
        setErrorMessage("Error adding medication.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrorMessage("Error adding medication." + error);
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
      {medications.length > 0 ? (
        <table className="excel-table">
          <thead>
            <tr>
              <th>Medications</th>
              <th>Dosage Quantities</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medicationEntry, index) => (
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
