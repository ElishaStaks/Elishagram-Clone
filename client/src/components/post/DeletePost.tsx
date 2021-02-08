import React from "react";
import { useHistory } from "react-router-dom";
import { useNewsFeedContext } from "../../contexts/NewsFeed/NewsFeedContext";
import customToast from "../../util/customToast";

interface DeletePostProps {
    postId: string;
    closeModal : () => void;
    goToHome: boolean
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, closeModal, goToHome }) => {
    const { newsFeed, setNewsFeed } = useNewsFeedContext();
    const history = useHistory();

    const handleDeletePost = () => {
        // closes the visible modal once post is deleted
        closeModal();

        // redirect to home page
        if (goToHome) {
            history.push(`/`);
        }

        // delete the post from the newsfeed context
        setNewsFeed(newsFeed.filter((post: {_id: string}) => post._id !== postId));
        customToast("Your post has been deleted successfully");

        // fetch request to thhe server to delete the post with the correct post id
        fetch(`/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("token")
            }
        }).then(async (res) => {
            const data = await res.json(); 

            // checks if the response went through
            if (res.ok) {
                // accept 
                return data;
            } else {
                // reject
                return Promise.reject(data);
            }
        });
    };

    return (
        <span className="colour-red" onClick={handleDeletePost}>
            Delete Post
        </span>
    );
};

export default DeletePost;