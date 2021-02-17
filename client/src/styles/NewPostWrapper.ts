import styled from "styled-components";

const NewPostWrapper = styled("div")`

  .newpost-caption {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  .newpost-header {
    text-align: center;
    padding: 8px; 
    position: relative;
  }

  .createpost-text {
    display: inline-block;
    padding: 2px;
  }

  .cancel {
    position: absolute;
    padding: 2px;
    margin: 6px;
    cursor: pointer;
  }

  .newpost-header span:first-child {
    color: #ED4956;
  }

  textarea {
    height: 100%;
    width: 100%;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    resize: none;
    background: #242526
  }

  .modal-content {
    width: 700px;
  }

  @media screen and (max-width: 780px) {
    .modal-content {
      width: 90vw;
    }
  }
`;

export default NewPostWrapper;