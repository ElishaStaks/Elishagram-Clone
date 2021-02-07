import styled from "styled-components";

const CommentWrapper = styled("div")`
  display: flex;

  .pointer: hover {
      text-decoration: underline;
  }

  span {
    padding-right: 0.4rem;
  }
`;

export default CommentWrapper;