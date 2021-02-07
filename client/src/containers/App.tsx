import React from "react";
import { ToastContainer } from 'react-toastify';
import { useUserContext } from "../contexts/User/UserContext";
import Routing from "../components/Routing";
import AuthState from "../components/AuthState";
import GlobalStyle from "../styles/Global";

function App() {
  const { user } = useUserContext();
  return (
    <>
      <ToastContainer autoClose={1000} closeButton={false} />
      <GlobalStyle />
      {user? <Routing /> : <AuthState />}
    </>
  );
}

export default App;
