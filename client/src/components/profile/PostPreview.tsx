import React from "react";
import { PostPreviewWrapper } from "../../styles/Profile";
import CommentIcon from "../iconComponents/comment";
import HeartIcon from "../iconComponents/heart";

const PostPreview: React.FC<any> = ({ posts }) => {

  return (
    <PostPreviewWrapper>
      {posts?.map((post: any) => (
        <div
          key={post._id}
          className="container-overlay"
        >
          <img src={post.files[0]} alt="post" />
          <div className="overlay">
            <div className="overlay-content">
              <span>
                <HeartIcon /> {post.likesCount}
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