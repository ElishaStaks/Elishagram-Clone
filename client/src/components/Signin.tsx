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

    const userClient =  useCallback(async () => {
        const response = await fetch("/user", {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("token")
            }
        }).then(async (res: Response) => {

            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
                
            }
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
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

        try {
             const { token } = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(
                    body
                )
            }).then(
                async (res) => {
                const data = await res.json();

                if (res.ok) {
                    return data;
                } else {
                    return Promise.reject(data);
                }
            })
            localStorage.setItem("token", token);
        } catch(error) {
            return customToast(error.message);
        }

        userClient();
        
        customToast("Sign in successful");

        setEmail("");
        setPassword("");
    }, [userClient, email, password]);

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