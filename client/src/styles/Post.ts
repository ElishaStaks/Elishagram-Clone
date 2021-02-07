import styled from "styled-components";

export const PostWrapper = styled("div")`
  width: 615px;
  background: #242526;
  border: 1px solid #3f3f40;
  margin-bottom: 1.5rem;

  .post-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-header {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .post-header h3 {
    cursor: pointer;
  }

  .post-img {
    width: 100%;
    height: 100%;
  }

  .post-actions {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    padding-bottom: 0.2rem;
  }

  .post-actions svg:last-child {
    margin-left: auto;
  }

  svg {
    margin-right: 1rem;
  }

  .likes-caption-comments {
    padding: 1rem;
    padding-top: 0.3rem;
  }

  .username {
    padding-right: 0.3rem;
  }

  .post-header-username:hover {
    text-decoration: underline
  }

  .username:hover {
    text-decoration: underline;
  }

  .view-comments {
    color: #B2B2B2;
    cursor: pointer;
  }

  textarea {
    height: 100%;
    width: 100%;
    border: none;
    border-top: 1px solid #3f3f40;
    resize: none;
    padding: 1rem 0 0 1rem;
    font-size: 1rem;
    font-family: "Fira Sans", sans-serif;
    color: white;
    background: #242526;

  }

  @media screen and (max-width: 690px) {
    width: 99%;
  }
`;

export const ModalContentWrapper = styled("div")`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #242526;
  border-radius: 6px;
  border: 1px solid white;

  span:last-child {
    border: none;
  }

  span {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid white;
    cursor: pointer;
  }
`;

export const PostModalWrapper = styled("div")`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow: hidden;

  .modal-content {
    background: #FFF;
    border-radius: 4px;
    margin: auto;
    justify-self: center;
  }

  .modal-content img.post-preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;