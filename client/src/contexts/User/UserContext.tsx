import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext<any>(null);

export const UserProvider: React.FC = ({ children }) => {
    const local = JSON.parse(localStorage.getItem('user')!);
    const [user, setUser] = useState<any | null>(local? local : null);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            { children }
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);