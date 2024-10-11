import React, { useState } from 'react';
import { FormContainer,Form,Input,Button } from '../styles/LoginFormStyles';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email,setEmail] = useState('')

  const handleSignUp = (event) => {
    event.preventDefault();

    if(password.length < 8){
      alert("Password is not fit NIST standard. Must be 8");
    }
    if (password === confirmPassword) {
      console.log('Sign up attempted with username:', username, 'and password:', password);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <FormContainer >
      <Form onSubmit={handleSignUp} >
        <label>
          Username:
          <Input
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </label>

          <label>
            Email:
            <Input
            type = "text"
            value={email}
            onChange ={(e) =>setEmail(e.target.value)}
            />
            
          </label>
        <label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
          />
        </label>
        <Button 
        type="submit" style={{ padding: '0.5rem 1rem' }}>
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SignUpForm;