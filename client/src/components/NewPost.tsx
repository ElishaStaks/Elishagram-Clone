import { useState } from "react";
import { toast } from "react-toastify";
import { useNewsFeedContext } from "../contexts/NewsFeed/NewsFeedContext";
import NewPostWrapper from "../styles/NewPostWrapper";
import PostIcon from "./iconComponents/post";
import PostModal from "./post/PostModal";

const NewPost: React.FC = () => {
    const { newsFeed, setNewsFeed } = useNewsFeedContext();
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

    const uploadPost = (event: any) => {
        if (!caption) {
            return toast.error("Please add a caption");
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
        }).then(async (res) => {
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
            setNewsFeed([post, ...newsFeed]); // adds post to the newsfeed
            window.scrollTo(0, 0);
            toast.success("Your post has been uploaded successfully");
        });
    };

    return (
        <NewPostWrapper>
            <label htmlFor="upload-post">
                <PostIcon fill="white" />
            </label>
            <input
            id="upload-post"
            type="file"
            onChange={onFileSelect}
            accept="image/*"
            style={{ display: "none" }}
            />
            {showModal && (
                <PostModal>
                    <div className="modal-content">
                        <div className="newpost-header">
                            <h3 onClick={() => setShowModal(false)}>Cancel</h3>
                            <h3 onClick={uploadPost}>Upload</h3>
                        </div>
                        {preview && (
                        <img className="post-preview" src={preview} alt="preview" />
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Add a caption"
                            value={caption}
                            onChange={(event: any) => setCaption(event.target.value)}
                        />
                    </div>
                </PostModal>
            )}
        </NewPostWrapper>
    );
}

export default NewPost;