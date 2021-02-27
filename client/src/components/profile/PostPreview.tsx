import React from "react";
import { PostPreviewWrapper } from "../../styles/Profile";
import CommentIcon from "../iconComponents/comment";
import FilledHeartIcon from "../iconComponents/filledHeart";

interface PostPreviewProps {
  posts: [{
    _id: string;
    files: [string];
    likesCount: number;
    commentsCount: number;
  }]
}

const PostPreview: React.FC<PostPreviewProps> = ({ posts }) => {

  return (
    <PostPreviewWrapper>
      {posts?.map((post) => (
        <div
          key={post._id}
          className="container-overlay"
        >
          <img src={post.files[0]} alt="post" />
          <div className="overlay">
            <div className="overlay-content">
              <span>
                <FilledHeartIcon /> {post.likesCount}
              </span>
              <span>
                <CommentIcon /> {post.commentsCount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </PostPreviewWrapper>
  );
};

export default PostPreview;