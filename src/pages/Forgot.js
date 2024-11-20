import React, { useState } from 'react';
import axios from "axios";
import {FormContainer,Form,Button,Input,LinkText,AnimationContainer} from '../styles/LoginFormStyles';

const ForgotForm = () => {
    const[email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleForgot = async (event) => { 
        event.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');
        
        try {
            const response = await axios.get('http://localhost:8080/accounts/search/email', { 
                params: { 
                    email: email
                }
            });

            if (response.status === 200 && response.data) {
                try {
                    const returnResponse = await axios.put(`http://localhost:8080/accounts/state/${response.data.id}`, null, {
                        params: { state: 'FORGOTPASSWORD' }
                    });
            
                    if (returnResponse.status === 200 && returnResponse.data) {
                        setSuccessMessage('Password reset request sent.');
                        setErrorMessage('');
                    } else {
                        setSuccessMessage('');
                        setErrorMessage('Error: Password reset request not sent.');
                    }
                } catch (error) {
                    setSuccessMessage('');
                    setErrorMessage('Error: Unable to send password reset request.' + error.message);
                    console.error('Error:', error.returnResponse ? error.returnResponse.data : error.message);
                }             
            } else {
                setSuccessMessage('');
                setErrorMessage('No account with that email exists.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error: Email could not be verified.');
        }
    }

    return(
        <FormContainer>
            <Form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', width: '300px' }} >
                <h2>
                    Reset your Password
                </h2>
                <label>
                    Email:
                    <Input 
                        type="text"
                        value = {email}
                        onChange ={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
                        placeholder='Enter your email'>
                    </Input>
                </label>
                <Button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Send Reset Link
                </Button>
                {errorMessage && (
                    <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
                )}
                {successMessage && (
                    <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
                )}
            </Form>
        </FormContainer>
)

}
export default ForgotForm;