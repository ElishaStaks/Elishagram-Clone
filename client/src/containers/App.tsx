import React, { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { useThemeContext } from '../contexts/Theme/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useUserContext } from "../contexts/User/UserContext";
import './App.css'
import Routing from "../components/Routing";

function App() {
  const { theme } = useThemeContext();
  const { user } = useUserContext();
  return (
    <StyledThemeProvider theme={theme}>
      <Routing />
    </StyledThemeProvider>
  );
}

export default App;
