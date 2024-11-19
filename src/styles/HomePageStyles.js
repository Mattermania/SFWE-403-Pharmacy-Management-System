import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

export const AlertBox = styled.div`
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #660000;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 600px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 5px 0;
  }
`;