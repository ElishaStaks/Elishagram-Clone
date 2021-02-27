import { useState } from "react";
import styled from "styled-components";
import { useNewsFeedContext } from "../contexts/NewsFeed/NewsFeedContext";
import CreatePostWrapper from "../styles/CreatePost";
import NewPostWrapper from "../styles/NewPostWrapper";
import customToast from "../util/customToast";
import PostModal from "./post/PostModal";

export const PostButton = styled("button")`
    background-color: #0095f6;
    border: 1px solid #0095f6;
    background-color: #0095F6;
    color: #000;
    padding: 0.4rem .5rem;
    border-radius: 4px;
    font-family: "Fira Sans", sans-serif;
    font-size: 1.3rem;
    color: white;
    width: inherit;
`;

const NewPost: React.FC = () => {
    const { newsfeed, setNewsfeed } = useNewsFeedContext();
    const [showModal, setShowModal] = useState(false);
    const [caption, setCaption] = useState("");
    const [preview, setPreview] = useState(""); // preview of the image you want to upload
    const [postImage, setPostImage] = useState("");

    const uploadImage = (file: string) => {
        const data = new FormData();
        // append file which we have from the image the user chooses
        data.append("file", file);
        // append upload preset which is the name of the preset in cloudinary (cloud-based image and video management services)
        data.append("upload_preset", "elishagram");
        // append your cloud name from cloudinary
        data.append("cloud_name", "insta-image-cloud");

        return fetch("https://api.cloudinary.com/v1_1/insta-image-cloud/image/upload", {
            method: "POST",
            body: data
        }).then((response) => response.json());
    }

    const onFileSelect = (event: any) => {
        if (event.target.files[0]) {
            const fileReader = new FileReader();

            fileReader.onload = (event: any) => {
                setPreview(event.target.result);
                setShowModal(true);
            }
            fileReader.readAsDataURL(event.target.files[0]); // reads the contents of the image uploaded
        
            uploadImage(event.target.files[0]).then((response) => {
                setPostImage(response.secure_url);
            });
        }
    };

    const uploadPost = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!caption) {
            return customToast("Please add a caption");
        }

        setShowModal(false); // hide modal

        setCaption(""); // set caption back to default

        const newPost = {
            caption: caption,
            files: [postImage]
        };

        fetch(`/posts`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("token") // passes the unique token of that user
            },
            body : JSON.stringify(
                newPost
            )
        }).then(async (res: Response) => {
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        }).then((response) => {
            // sets the default values to that post
            const post = response.data;
            post.isLiked = false;
            post.isMine = true;
            setNewsfeed([post, ...newsfeed]); // adds post to the newsfeed
            window.scrollTo(0, 0);
            customToast("Your post has been uploaded successfully");
        });
    };

    return (
        <NewPostWrapper>
            <CreatePostWrapper>
                <label className="form-container" htmlFor="upload-post">
                    Photo
                </label>
            </CreatePostWrapper>
            <input
            id="upload-post"
            type="file"
            onChange={onFileSelect}
            accept="image/*"
            style={{ display: "none" }}
            />
            {showModal && (
                <PostModal>
                    <div className="newpost-header">
                        <div className="cancel">
                            <span onClick={() => setShowModal(false)}>Cancel</span>
                        </div>
                        <div className="createpost-text">
                            <h2> Create Post</h2>
                        </div>
                    </div>
                    <hr style={{ border: '0.5px solid rgb(219 219 219 / .2)'}} />
                    <div className="modal-content">
                        <div className="newpost-caption">
                            <textarea
                            placeholder="Whats on your mind?"
                            value={caption}
                            onChange={(event: any) => setCaption(event.target.value)}
                            />
                        </div>
                        {preview && (
                        <img className="post-preview" src={preview} alt="preview" />
                        )}
                    </div>
                    <PostButton onClick={uploadPost}>Post</PostButton>
                </PostModal>
            )}
        </NewPostWrapper>
    );
}

export default NewPost;