// src/App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomers from "./pages/ViewCustomers";
import TrackPrescriptions from "./pages/TrackPrescriptions"; // Import Track Prescriptions
import AddPrescription from "./pages/AddPrescription"; // Import Add Prescription
import UpdateInventory from "./pages/UpdateInventory"; // Import Update Inventory page
import MedicationSpecifics from "./pages/MedicationSpecifics"; // Import Medication Specifics page
import Login from "./Login";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";
import Pharmacist from "./pages/Pharmacist";
import GenerateReportPage from "./pages/GenerateReportPage";
import FinancialReportPage from "./pages/FinancialReportPage";
import InventoryReportPage from "./pages/InventoryReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/beforepharm" element={<HomePage />} />
        <Route path="/pharmacist" element={<Pharmacist />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/view-customers" element={<ViewCustomers />} />
        <Route path="/track-prescriptions" element={<TrackPrescriptions />} />
        <Route path="/add-prescription" element={<AddPrescription />} />
        <Route path="/update-inventory" element={<UpdateInventory />} />
        <Route path="/generate-report" element ={<GenerateReportPage />} />
        <Route path="/financial-report" element ={<FinancialReportPage/>} />
        <Route path ="/inventory-report" element ={<InventoryReportPage/>} />
        <Route
          path="/medication-specifics/:medicationId"
          element={<MedicationSpecifics />}
        />{" "}
        {/* New route for medication specifics */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
