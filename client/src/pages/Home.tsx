import React, { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";
import Post from "../components/post/Post";
import InitialSuggestions from "../components/InitialSuggestions";
import { UserCard } from "../components/UserCard";
import { useNewsFeedContext } from "../contexts/NewsFeed/NewsFeedContext";
import { useUserContext } from "../contexts/User/UserContext";
import HomeWrapper from "../styles/HomeWrapper";

const Home: React.FC = () => {
    const { user, setUser } = useUserContext();
    const { newsFeed, setNewsFeed } = useNewsFeedContext();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch('/newsfeed', {
            method: "GET",
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("token")
            }
        }).then(async (res: Response) => {
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        }).then((response) => {
            setNewsFeed(response.data);
            setLoad(false);
        }).catch(error => console.log(JSON.stringify(error)));

    }, [setUser, setNewsFeed]);

    if (load){
        return <LoadSpinner />
    }

    return (
        <HomeWrapper>
            {newsFeed.length > 0 ? (
                <>
                    <div className="home">
                        {newsFeed.map((post: any) => (<Post key={post._id} post={post} />))}
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