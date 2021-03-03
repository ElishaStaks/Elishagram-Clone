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
    const { newsfeed, setNewsfeed } = useNewsFeedContext();
    const history = useHistory();

    const handleDeletePost = async () => {
        // closes the visible modal once post is deleted
        closeModal();

        // redirect to home page
        if (goToHome) {
            history.push(`/`);
        }

        // delete the post from the newsfeed context
        setNewsfeed(newsfeed.filter((post: {_id: string}) => post._id !== postId));
        customToast("Your post has been deleted successfully");

        // fetch request to thhe server to delete the post with the correct post id
        const path: string = `/${postId}`;
        const api: RequestInit = { method: "DELETE", headers: {
            "Authorization":"Bearer " + localStorage.getItem("token")
        }}

        try {
            const response = await fetch(path, api);
            return response;

        } catch(error) {
            return customToast(error.message);
        }
    };

    return (
        <span className="colour-red" onClick={handleDeletePost}>
            Delete Post
        </span>
    );
};

export default DeletePost;