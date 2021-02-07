import styled from "styled-components";

const CreatePostWrapper = styled("div")`

  width: 930px;
  border: 1px solid #3f3f40;
  display: grid;
  background: #242526;

  label {
    color: white;
    font-size: xx-large;
    text-align: center;
    cursor: pointer; 
  }

 
  .form-container {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 970px) {
    width: 90%;
  }

  @media screen and (max-width: 700px) {
    width: 98%;
  }

  @media screen and (max-width: 550px) {
    width: 99%;
  }
`;

export default CreatePostWrapper;