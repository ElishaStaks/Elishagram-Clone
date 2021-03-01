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
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupCreds: SignupCredentials = {
        fullname: fullname,
        username: username,
        email: email,
        password: password
    }

    const userClient = useCallback( async () => {
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

    const handleSignup = useCallback(async (creds: SignupCredentials) => {
        // if the user hasn't added all the correct information
        if (!fullname || !username || !email || !password) {
            // return a toast to the user
            return customToast("Need to fill in all the fields");
        }

        const body = {
            fullname: creds.fullname,
            username: creds.username,
            email: creds.email,
            password: creds.password
        };

        try {
            console.log(body);
            const { token } = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    body
                )
            }).then(
                async (res: Response) => {
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

        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
    }, [userClient, fullname, username, email, password]);

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