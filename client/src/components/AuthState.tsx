import React, { useState } from "react";
import Signin from "./Signin";
import Signup from './Signup';

/**
 * Handles the auth state of the user
 */
const AuthState: React.FC = () => {
    // default state will be the sign in page
    const [auth, setAuth] = useState("SIGNIN");

    const signin = () => {
        setAuth("SIGNIN");
    }
    
    const signup = () => {
        setAuth("SIGNUP");
    }

    const renderSwitch = () => {
        switch(auth) {
            case "SIGNUP": return <Signup signin={signin}/>; // show sign in page
            case "SIGNIN": return <Signin signup={signup}/>; // show sign up page
        }
    }

    return (
        <div>
            {renderSwitch()}
        </div>
    );
};

export default AuthState