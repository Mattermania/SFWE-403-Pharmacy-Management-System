import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomers from "./pages/ViewCustomers";
import TrackPrescriptions from "./pages/TrackPrescriptions";
import AddPrescription from "./pages/AddPrescription";
import Login from "./Login";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";
import Pharmacist from "./pages/Pharmacist";
import UnlockAccounts from "./pages/UnlockAccounts"; // Import the new component

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
        <Route
          path="/track-prescriptions"
          element={<TrackPrescriptions />}
        />
        <Route
          path="/add-prescription"
          element={<AddPrescription />}
        />
        <Route
          path="/unlock-accounts"
          element={<UnlockAccounts />}
        />{" "}
        {/* New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
