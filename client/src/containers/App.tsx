import React from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from "../contexts/User/UserContext";
import Routing from "../components/Routing";
import AuthState from "../components/AuthState";
import GlobalStyle from "../styles/Global";

function App() {
  const { user } = useUserContext();
  return (
    <>
      <GlobalStyle />
      <ToastContainer transition={Zoom} autoClose={3000} />
      {user? <Routing /> : <AuthState />}
    </>
  );
}

export default App;
