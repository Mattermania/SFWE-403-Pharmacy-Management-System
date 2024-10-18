import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ExcelTableStyles.css"; // Assuming existing styles

const AddPrescription = () => {
  const [prescription, setPrescription] = useState({
    customerId: "",
    prescriptionName: "",
    state: "Not Processed",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating an API request to add a prescription
    console.log("Prescription added:", prescription);
    // Later replace with axios.post or fetch API
    /*
      axios.post("http://localhost:8080/prescriptions", prescription)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    */
    alert("Prescription added successfully!");
    navigate("/track-prescriptions");
  };

  return (
    <div className="form-container">
      <h1>Add Prescription</h1>
      <form onSubmit={handleSubmit}>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customerId"
          value={prescription.customerId}
          onChange={handleChange}
          required
        />
        <label>Prescription Name:</label>
        <input
          type="text"
          name="prescriptionName"
          value={prescription.prescriptionName}
          onChange={handleChange}
          required
        />
        <label>State:</label>
        <select name="state" value={prescription.state} onChange={handleChange}>
          <option value="Not Processed">Not Processed</option>
          <option value="Processing">Processing</option>
          <option value="Ready">Ready</option>
        </select>
        <button type="submit">Add Prescription</button>
      </form>
    </div>
  );
};

export default AddPrescription;
