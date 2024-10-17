// src/App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCustomer from "./pages/AddCustomer";
import Login from "./Login"; // Updated
import Forgot from "./pages/Forgot"; // Updated
import Signup from "./pages/Signup"; // Updated
import Pharmacist from "./pages/Pharmacist";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
