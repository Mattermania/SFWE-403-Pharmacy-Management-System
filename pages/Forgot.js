import React, { useState } from 'react';
import {FormContainer,Form,Button,Input,LinkText,AnimationContainer} from '../styles/LoginFormStyles';

const ForgotForm = () => {
    const[email,setEmail] = useState('');

    const handleForgot =(event) => { 
        event.preventDefault();
        console.log('Password Change sent to s + email');
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
            </Form>
        </FormContainer>
)

}
export default ForgotForm;