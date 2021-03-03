import React, { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";
import Post from "../components/post/Post";
import InitialSuggestions from "../components/InitialSuggestions";
import { UserCard } from "../components/UserCard";
import { useNewsFeedContext } from "../contexts/NewsFeed/NewsFeedContext";
import { useUserContext } from "../contexts/User/UserContext";
import HomeWrapper from "../styles/HomeWrapper";
import customToast from "../util/customToast";

const Home: React.FC = () => {
    const { user, setUser } = useUserContext();
    const { newsfeed, setNewsfeed } = useNewsFeedContext();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchProfile = async() => {
            const path: string = "/newsfeed";
            const api: RequestInit = { method: "GET", headers: {
                "Authorization":"Bearer " + localStorage.getItem("token")
            }}

            try {
                const response = await fetch(path, api);
                const { data } = await response.json();

                setNewsfeed(data);
                setLoad(false);
            } catch (error) {
                return customToast(error.message);
            }
        }

        fetchProfile();

    }, [setUser, setNewsfeed]);

    if (load){
        return <LoadSpinner />
    }

    return (
        <HomeWrapper>
            {newsfeed.length > 0 ? (
                <>
                    <div className="home">
                        {newsfeed.map((post) => (<Post key={post._id} post={post} />))}
                    </div>
                    <UserCard user={user} />
                </>
            ) : (
                <InitialSuggestions />
            )}
        </HomeWrapper>
    );
};

export default Home;