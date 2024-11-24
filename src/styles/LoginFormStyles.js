import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Light blue color scheme with complementary colors
const primaryColor = '#ADD8E6'; // Light Blue
const secondaryColor = '#4F74BF'; // Darker Blue for accents
const borderColor = '#CCCCCC'; // Light grey for borders
const textColor = '#333333'; // Dark grey for text

export const PharmacistContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #333;
`;

export const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem; // Space between the animation and the form
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0rem;
  background-color: ${primaryColor}; // Light blue background
  padding: 3rem;
  border-radius: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
  background-color: white;
  border: 1px solid ${borderColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-right: 3rem; /* Leave space for the EyeButton */
  margin-bottom: 1rem;
  border: 1px solid ${borderColor};
  border-radius: 3px;
  font-size: 1rem;
  box-sizing: border-box; /* Ensure padding doesn't affect size */
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
  background-color: #00008B;
  margin: 0;
  padding: 1rem;
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 10px; /* Position closer to the input edge */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${secondaryColor};
  font-size: 1.5rem; /* Increase size for better visibility */
  width: 2rem; /* Control button size */
  height: 2rem; /* Control button size */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #365B93; /* Change color on hover */
  }
`;

export const InputContainer = styled.div`
  position: relative; /* Needed for EyeButton positioning */
  display: flex;
  width: 100%;
`;

export const InventoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const InventoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const WarningText = styled.span`
  color: red;
  font-weight: bold;
`;