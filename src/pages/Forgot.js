import React, { useState } from 'react';

const ForgotForm = () => {
    const[email,setEmail] = useState('');

    const handleForgot =(event) => { 
        event.preventDefault();
        console.log('Password Change sent to ' + email);
    }

    return(
        <div>
            <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', width: '300px' }} >
                <h2>
                    Reset your Password
                </h2>
                <label>
                    Email:
                    <input 
                        type="text"
                        value = {email}
                        onChange ={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
                        placeholder='Enter your email'>
                    </input>
                </label>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Send Reset Link
                </button>
            </form>
        </div>
)

}
export default ForgotForm;