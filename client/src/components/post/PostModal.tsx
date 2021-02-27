import React from "react";
import { PostModalWrapper } from "../../styles/Post";
const PostModal: React.FC = ({ children }) => {
  return (
    <PostModalWrapper>
      <div className="modal-content">{children}</div>
    </PostModalWrapper>
  );
};

export default PostModal;