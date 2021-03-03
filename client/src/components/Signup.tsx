import React, { useCallback, useState } from "react";
import { useUserContext } from "../contexts/User/UserContext";
import FormWrapper from "../styles/Form";
import logo  from '../assets/logo.png'
import customToast from "../util/customToast";

interface SignupProps {
    signin: () => void;
}

interface SignupCredentials {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

const Signup: React.FC<SignupProps> = props => {
    // Grab the global user context
    const { setUser } = useUserContext();
    const [fullname, setFullname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signupCreds: SignupCredentials = {
        fullname: fullname,
        username: username,
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

    const handleSignup = useCallback(async (creds: SignupCredentials) => {
        // if the user hasn't added all the correct information
        if (!fullname || !username || !email || !password) {
            // return a toast to the user
            return customToast("Need to fill in all the fields");
        }

        const body = {
            username: creds.username,
            fullname: creds.fullname,
            email: creds.email,
            password: creds.password
        };
        const path: string = "/signup";
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

        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
    }, [fetchClient, fullname, username, email, password]);

    return (
        <FormWrapper onSubmit={(event) => {event.preventDefault(); handleSignup(signupCreds)}}>
            <img src={logo} alt="logo" />
            <form>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullname} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFullname(event.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                />

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />

                <input type="submit" value="Sign up" className="signup-btn" />
            </form>
            <div>
                <p>
                    Already have an account? <span onClick={props.signin}>Sign in</span>
                </p>
            </div>
        </FormWrapper>
    );
}

export default Signup;