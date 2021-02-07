import React from "react";
import { PostModalWrapper } from "../../styles/Post";
const PostModal = ({ children }: any) => {
  return (
    <PostModalWrapper>
      <div className="modal-content">{children}</div>
    </PostModalWrapper>
  );
};

export default PostModal;