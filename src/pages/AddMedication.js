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

  const removeMedication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/inventory/${id}`);
      setMedications(medications.filter((medication) => medication.id !== id));
    } catch (error) {
      setError('Error deleting medication: ' + (error.response?.data.message || error.message));
    }
  };

  const handleAddMedication = async () => {
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      // Create new medication object
      const newMedicationData = {
        name: newMedication.name,
        manufacturer: newMedication.manufacturer,
        price: newMedication.price,
        medicationInventory: [{expirationDate: newMedication.startingExpirationDate, quantity: newMedication.startingQuantity}],
        prescriptions: []
      };
  
      // Send medication data
      const medicationResponse = await axios.post('http://localhost:8080/inventory', newMedicationData);
      if (medicationResponse.status === 201) {
        console.log("Medication created:", medicationResponse.data);
        setSuccessMessage(`Medication created successfully.`);

        try {
          // Create a new logs object
          const now = new Date();

          const newLogData = {
            logType: "inventory",
            date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
            time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
            userId: account.id,
            medicationId: medicationResponse.id,
            quantityChanged: medicationResponse.totalQuantity,
            totalQuantity: medicationResponse.totalQuantity,
            state: "CREATED"
          };

          await axios.post('http://localhost:8080/reports/inventory', newLogData);
        } catch(error) {
          // Handle errors and show error message
          console.error("Error logging inventory change", error);
          setErrorMessage("Error logging inventory change");
          setSuccessMessage("");
          return;
        }
      } else {
        setErrorMessage('Error creating medication.');
      }

      setMedications([
        ...medications,
        { ...newMedication, id: medications.length + 1 },
      ]);
      setNewMedication({
        name: "",
        manufacturer: "",
        startingExpirationDate: "",
        startingQuantity: 0,
        price: 0,
        medicationInventory: [],
        prescriptions: [],
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrorMessage('Error creating medication.');
    }
  };

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
                <td>{medication?.totalQuantity || 0}</td>
                <td>{medication?.price || 0}</td>
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
        <label>
        Medication Name:
          <input
            type="text"
            name="name"
            value={newMedication.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={newMedication.manufacturer}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="date"
            name="startingExpirationDate"
            value={newMedication.startingExpirationDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="startingQuantity"
            value={newMedication.startingQuantity}
            onChange={handleInputChange}
          />
          Price:
          <input
            type="number"
            name="price"
            value={newMedication.price}
            onChange={handleInputChange}
            step="0.01" // Allows decimal values for cents
            min="0" // Ensures non-negative values
            placeholder="Enter price"
          />
        </label>
        <button onClick={handleAddMedication}>Add Medication</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default TrackMedications;
