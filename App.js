import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomers from "./pages/ViewCustomers";
import TrackPrescriptions from "./pages/TrackPrescriptions";
import AddPrescription from "./pages/AddPrescription";
import UpdateInventory from "./pages/UpdateInventory";
import MedicationSpecifics from "./pages/MedicationSpecifics";
import Login from "./Login";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";
import Pharmacist from "./pages/Pharmacist";
import OrderMedicine from "./pages/OrderMedicine"; // Import OrderMedicine
import GenerateReportPage from "./pages/GenerateReportPage";
import FinancialReportPage from "./pages/FinancialReportPage";
import InventoryReportPage from "./pages/InventoryReportPage";
import UnlockAccounts from "./pages/UnlockAccounts"; // Import the UnlockAccounts component
import ActivityLog from "./pages/ActivityLog"; // Import the new ActivityLog component
import ProcessPrescriptionPurchase from "./pages/ProcessPrescriptionPurchase"; // Added import 

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
        <Route path="/generate-report" element={<GenerateReportPage />} />
        <Route path="/financial-report" element={<FinancialReportPage />} />
        <Route path="/inventory-report" element={<InventoryReportPage />} />
        <Route path="/unlock-accounts" element={<UnlockAccounts />}/>
        <Route path="/medication-specifics/:medicationId" element={<MedicationSpecifics />}/>
        <Route path="/order-medicine" element={<OrderMedicine />} /> {/* Add Order Medicine route */}
        <Route path="/activity-log" element={<ActivityLog />}/>
        <Route path="/process-prescription-purchase" element={<ProcessPrescriptionPurchase />} /> 
  /*Added the line above, new route */
      </Routes>
    </BrowserRouter>
  );
}

export default App;
