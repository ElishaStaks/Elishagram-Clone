import React from "react";
import InitialSuggestions from "../components/InitialSuggestions";
import UserCard from "../components/UserCard";
import { useUserContext } from "../contexts/User/UserContext";


const UserSuggestions: React.FC = () => {
    const { user } = useUserContext();
    return (
        <div>
            <InitialSuggestions />
            <UserCard user={user} />
        </div>
    );
};

export default UserSuggestions;