import React from "react";
import { useHistory } from "react-router-dom";
import { CommentProps } from "../../Interfaces";
import CommentWrapper from "../../styles/CommentWrapper";

const Comment: React.FC<CommentProps> = ({ comment }) => {
    const history = useHistory();

    return (
        <CommentWrapper>
            <p>
                <span
                onClick={() => history.push(`/${comment.user.username}`)}
                className="pointer"
                >
                    <strong>{comment.user.username}</strong>
                </span>
                {comment.text}
            </p>
        </CommentWrapper>
    );
};

export default Comment;