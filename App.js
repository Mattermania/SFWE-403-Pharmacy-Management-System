import React, { useState } from 'react';
import Header from './Header';
import Login from './Login';
import PharmacyStaffGUI from './PharmacyStaffGUI';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true); // For now, simulate a successful login
    };

    return (
        <div className="App">
            <Header />
            {!isLoggedIn ? <Login onLogin={handleLogin} /> : <PharmacyStaffGUI />}
        </div>
    );
}

export default App;
