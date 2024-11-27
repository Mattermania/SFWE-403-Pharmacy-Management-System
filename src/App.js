import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout

// Import all pages
import HomePage from "./pages/HomePage";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomers from "./pages/ViewCustomers";
import TrackPrescriptions from "./pages/TrackPrescriptions";
import AddMedication from "./pages/AddMedication"; // Import Add Medication
import AddPrescription from "./pages/AddPrescription";
import UpdateInventory from "./pages/UpdateInventory";
import MedicationSpecifics from "./pages/MedicationSpecifics";
import PrescriptionSpecifics from "./pages/PrescriptionSpecifics"; // Import Prescription Specifics page
import Login from "./Login";
import ForgotPassword from "./Forgot";
import Signup from "./pages/Signup";
import Pharmacist from "./pages/Pharmacist";
import OrderMedicine from "./pages/OrderMedicine";
import GenerateReportPage from "./pages/GenerateReportPage";
import FinancialReportPage from "./pages/FinancialReportPage";
import InventoryReportPage from "./pages/InventoryReportPage";
import UnlockAccounts from "./pages/UnlockAccounts";
import ManageRoles from "./pages/ManageRoles";
import TransactionPage from "./pages/TransactionPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import { PendingAccountsProvider } from "./context/PendingAccountsContext"; // Import the provider

function App() {
  return (
    <PendingAccountsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Protected routes wrapped with Layout */}
          <Route element={<Layout />}>
            <Route path="/beforepharm" element={<HomePage />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/view-customers" element={<ViewCustomers />} />
            <Route path="/track-prescriptions" element={<TrackPrescriptions />} />
            <Route path="/add-prescription" element={<AddPrescription />} />
            <Route path="/add-medication" element={<AddMedication />} />
            <Route path="/update-inventory" element={<UpdateInventory />} />
            <Route path="/medication-specifics/:medicationId" element={<MedicationSpecifics />}/>
            <Route path="/prescription-specifics/:prescriptionId" element={<PrescriptionSpecifics />} />
            <Route path="/pharmacist" element={<Pharmacist />} />
            <Route path="/order-medicine" element={<OrderMedicine />} />
            <Route path="/generate-report" element={<GenerateReportPage />} />
            <Route path="/financial-report" element={<FinancialReportPage />} />
            <Route path="/inventory-report" element={<InventoryReportPage />} />
            <Route path="/unlock-accounts" element={<UnlockAccounts />} />
            <Route path="/manage-roles" element={<ManageRoles />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PendingAccountsProvider>
  );
}

export default App;