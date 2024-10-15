import "./App.css";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/Signup";
import LoginForm from "./Login";
import ForgotForm from "./pages/Forgot";
import Pharmacist from "./pages/Pharmacist";
import HomePage from "./pages/HomePage";
// /import { GlobalStyle } from './GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgotpassword" element={<ForgotForm />} />
          <Route path="/beforepharm" element={<HomePage />} />
          <Route path="/pharmacist" element={<Pharmacist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
