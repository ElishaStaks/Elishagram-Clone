import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PostWrapper } from '../../styles/Post';
import ModalContent from './ModalContent';
import PostModal from './PostModal';
import CommentIcon from "../iconComponents/comment";
import Avatar from "../../styles/Avatar";
import LikePost from "./LikePost";
import Comment from './comment/Comment';
import { PostProps } from "../../Interfaces";
import MoreIcon from "../iconComponents/dots";

interface NewCommentsProps {
  _id: string;
  user: { 
    username: string;
    avatar: string;
  }; 
  text: string; 
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [comment, setComment] = useState(""); // comment state which has a default value of nothing
  const history = useHistory(); // redirect 

  const [showModal, setShowModal] = useState(false); // state which allows for visible and hidden modal upon button press
  const closeModal = () => setShowModal(false); // closes modal upon button press

  const [newComments, setNewComments] = useState<NewCommentsProps[]>([]);
  const [likesState, setLikes] = useState(post.likesCount);

  const increaseLikes = () => setLikes(likesState + 1); // adds one like to the post
  const decreaseLikes = () => setLikes(likesState - 1);// removes one like to from the post

  /**
   * Handles adding comments to posts which accepts keyboard event to see when user is typing
   */
  const handleAddComment = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter key code
    if (event.keyCode === 13) {
      // prevents default action when submitting comment to the post
      event.preventDefault();

      // request post data from server
      fetch(`${post._id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
              text: comment
          })
      }).then(async (res: Response) => {
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
      }).then((response) => setNewComments([...newComments, response.data])); // after response is valid add that data to new comments state

      // removes text from comment text area
      setComment("");
    }
  };

  return (
    <PostWrapper>
      <div className="post-header-wrapper">
        <div className="post-header">
          <Avatar
            className="pointer"
            src={post.user?.avatar}
            alt="avatar"
            onClick={() => history.push(`/${post.user?.username}`)} // redirect to user profile upon clicking on their photo
          />
          <h4
            className="pointer"
            onClick={() => history.push(`/${post.user?.username}`)} // redirect to user profile upon clicking on their username
          >
            <strong className="post-header-username">{post.user?.username}</strong>
          </h4>
        </div>

        {showModal && (
          <PostModal>
            <ModalContent postId={post._id} closeModal={closeModal} />
          </PostModal>
        )}
        {post.isMine && <MoreIcon onClick={() => setShowModal(true)} />}
      </div>

      <img
        className="post-img"
        src={post.files[0]}
        alt="post-img"
      />

      <div className="post-actions">
        <LikePost
          isLiked={post.isLiked}
          postId={post._id}
          increaseLikes={increaseLikes}
          decreaseLikes={decreaseLikes}
        />
        <CommentIcon fill="transparent" />
      </div> 

      <div className="likes-caption-comments">
        {likesState !== 0 && (
          <span className="likes bold">
            {likesState} {likesState > 1 ? "likes" : "like"}
          </span>
        )}

        <p>
          <span
            onClick={() => history.push(`/${post.user?.username}`)}
            className="pointer username bold"
          >
            <strong>{post.user?.username}</strong>
          </span>
          {post.caption}
        </p>

        {post.comments?.slice(0, 2).map((comment) => (
            <Comment key={comment._id} comment={comment} />
        ))}

        {newComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>

      <div className="add-comment">
        <textarea
          placeholder="Add a Comment..."
          value={comment}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
          onKeyDown={handleAddComment}
        ></textarea>
      </div>
    </PostWrapper>
  );
};

export default Post;
