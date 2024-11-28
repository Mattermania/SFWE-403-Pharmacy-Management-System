import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css";

const TrackMedications = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;

  const [newMedication, setNewMedication] = useState({
    name: "",
    manufacturer: "",
    startingExpirationDate: "",
    startingQuantity: 0,
    price: 0,
    medicationInventory: [],
    prescriptions: []
  });
  
  // Fetch medications from the backend
  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory'); // Replace with actual endpoint
      setMedications(response.data);
    } catch (error) {
      setError('Error fetching medications: ' + (error.response?.data.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Run fetchMedications on component mount
  useEffect(() => {
    fetchMedications();
  }, [account, navigate]);

  const handleAddMedication = async () => {
    // Clear messages
    setErrorMessage('');
    setSuccessMessage('');
  
    // Validate input
    if (!validateMedication(newMedication)) {
      setErrorMessage('Not all fields have been filled or values are invalid.');
      return;
    }

    for(let medication of medications) {
      if (medication.name === newMedication.name) {
        setErrorMessage('Medication with this name already exists.');
        return;
      }
    }
  
    try {
      // Create and submit medication data
      const newMedicationData = createMedicationData(newMedication);
      const medicationResponse = await axios.post('http://localhost:8080/inventory', newMedicationData);
  
      if (medicationResponse.status === 201) {
        console.log("Medication created:", medicationResponse.data);
        setSuccessMessage(`Medication created successfully.`);
        await logInventoryChange(medicationResponse.data);
  
        // Update local state
        updateMedicationsState(medicationResponse.data);
      } else {
        setErrorMessage('Error creating medication.');
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrorMessage('Error creating medication.');
    }
  };
  
  // Utility to validate the input
  const validateMedication = (medication) => {
    return (
      medication.name &&
      medication.manufacturer &&
      medication.startingExpirationDate &&
      medication.startingQuantity > 0 &&
      medication.price > 0
    );
  };
  
  // Create new medication object
  const createMedicationData = (medication) => ({
    name: medication.name,
    manufacturer: medication.manufacturer,
    price: medication.price,
    medicationInventory: [
      { expirationDate: medication.startingExpirationDate, quantity: medication.startingQuantity },
    ],
    prescriptions: [],
  });
  
  // Log inventory change
  const logInventoryChange = async (medicationData) => {
    try {
      const now = new Date();
      const newLogData = {
        logType: "inventory",
        date: formatDate(now),
        time: formatTime(now),
        userId: account.id,
        medicationId: medicationData.id,
        quantityChanged: medicationData.totalQuantity,
        totalQuantity: medicationData.totalQuantity,
        state: "CREATED",
      };
  
      await axios.post('http://localhost:8080/reports/inventory', newLogData);
    } catch (error) {
      console.error("Error logging inventory change:", error);
      setErrorMessage("Error logging inventory change");
      setSuccessMessage("");
      throw error; // Re-throw to ensure error state propagates
    }
  };
  
  // Update local state after successful creation
  const updateMedicationsState = (medicationData) => {
    setMedications((prevMedications) => [
      ...prevMedications,
      { ...medicationData, id: prevMedications.length + 1 },
    ]);
    resetNewMedication();
  };
  
  // Reset form
  const resetNewMedication = () => {
    setNewMedication({
      name: "",
      manufacturer: "",
      startingExpirationDate: "",
      startingQuantity: 0,
      price: 0,
      medicationInventory: [],
      prescriptions: [],
    });
  };
  
  // Utility functions for date and time formatting
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({ ...newMedication, [name]: value });
  };
  

  if (loading) {
    return <p>Loading medications...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="excel-table-container">
      <h1>Add Medications</h1>
  
      {/* Medication List Table */}
      <table className="excel-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Manufacturer</th>
            <th>Total Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {medications.length > 0 ? (
            medications.map((medication) => (
              <tr key={medication.id}>
                <td>{medication.name}</td>
                <td>{medication.manufacturer}</td>
                <td>{medication.totalQuantity || 0}</td>
                <td>${medication.price?.toFixed(2) || "0.00"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No medications available
              </td>
            </tr>
          )}
        </tbody>
      </table>
  
      {/* Add Medication Form */}
      <div className="add-medication-form">
        <h3>Add New Medication</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMedication();
          }}
        >
          <label>
            Medication Name:
            <input
              type="text"
              name="name"
              value={newMedication.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Manufacturer:
            <input
              type="text"
              name="manufacturer"
              value={newMedication.manufacturer}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Expiration Date:
            <input
              type="date"
              name="startingExpirationDate"
              value={newMedication.startingExpirationDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="startingQuantity"
              value={newMedication.startingQuantity}
              onChange={handleInputChange}
              required
              min="1"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newMedication.price}
              onChange={handleInputChange}
              step="0.01"
              min="0.01"
              placeholder="Enter price"
              required
            />
          </label>
          <button type="submit">Add Medication</button>
        </form>
  
        {/* Error and Success Messages */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );  
};

export default TrackMedications;
