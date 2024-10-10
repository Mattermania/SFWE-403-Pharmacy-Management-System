import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Light blue color scheme with complementary colors
const primaryColor = '#ADD8E6'; // Light Blue
const secondaryColor = '#4F74BF'; // Darker Blue for accents
const borderColor = '#CCCCCC'; // Light grey for borders
const textColor = '#333333'; // Dark grey for text


export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E6F7FF; /* Light Blue Background */
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  background-color: ${primaryColor}; // Light blue background
  padding: 2rem;
  border-radius: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 20px;
  background-color: white;
  border: 1px solid ${borderColor};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: ${secondaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #365B93; // Slightly darker blue on hover
  }
`;

export const LinkText = styled(Link)`
  margin-top: 1rem;
  text-align: center;
  color: ${secondaryColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Heading = styled.h1`
  color: ${textColor};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;