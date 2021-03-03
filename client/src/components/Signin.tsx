import React, { useCallback, useState } from "react";
import { useUserContext } from "../contexts/User/UserContext";
import FormWrapper from "../styles/Form";
import logo  from '../assets/logo.png'
import customToast from "../util/customToast";

interface SigninProps {
    signup: () => void;
}

interface SigninCredentials {
    email: string;
    password: string;
}

const Signin: React.FC<SigninProps> = props => {
    const { setUser } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signinCreds: SigninCredentials = {
        email: email,
        password: password
    }

    const fetchClient = useCallback( async () => {
        const path: string = "/user";
        const api: RequestInit = { method: "GET", headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
        }}

        try {
            const response = await fetch(path, api);

            const { data } = await response.json();

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch(error) {
            return customToast(error.message);
        }
    }, [setUser]);

    const handleSignin = useCallback( async (creds: SigninCredentials) => {
        // if the user hasn't added all the correct information
        if (!email || !password) {
            // return a toast to the user
            return customToast("You need to fill in all the fields");
        }

        const body = {
            email: creds.email,
            password: creds.password
        };
        const path: string = "/signin";
        const api: RequestInit = { method: "POST", headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
        }, body: JSON.stringify(body)}

        try {
            const response =  await fetch(path, api);

            const { token } = await response.json();
            localStorage.setItem("token", token);

        } catch(error) {
            return customToast(error.message);
        }

        fetchClient();

        setEmail("");
        setPassword("");
    }, [fetchClient, email, password]);

    return (
        <FormWrapper onSubmit={(event) => {event.preventDefault(); handleSignin(signinCreds)}}>
            <img src={logo} alt="logo" />
            <form>
                <input 
                    type="email" 
                    placeholder="email" 
                    value={email} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />

                <input type="submit" value="Sign in" className="signin-btn" />
            </form>
            <div>
                <p>
                    Dont have an account? <span onClick={props.signup}>Sign up</span>
                </p>
            </div>
        </FormWrapper>
    );
};

export default Signin;