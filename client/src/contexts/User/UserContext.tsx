import React, { useState, createContext, useContext } from "react";

type UserState =  {
    username: string;
    fullname: string;
    bio: string;
    email: string;
    avatar: string;
}

interface UserContextProps {
    user: UserState;
    setUser: Function;
}

const local = JSON.parse(localStorage.getItem('user')!);

// create context
export const UserContext = createContext<UserContextProps>({
    user: local || null,
    setUser: () => null
});

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserState>(local? local : null);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            { children }
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);