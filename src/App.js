import './App.css';
import Header from './Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from './pages/Signup';
import LoginForm from './Login';
import ForgotForm from './pages/Forgot';
// /import { GlobalStyle } from './GlobalStyles';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path= "/forgotpassword" element={<ForgotForm/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
