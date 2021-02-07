import styled from "styled-components";

const FormWrapper = styled("div")`
  background-color: #242526;
  padding: 1rem;
  width: 350px;
  border: 1px solid #DBDBDB;
  margin: 6rem auto;
  text-align: center;
  padding: 2rem 0;

  img {
    margin-bottom: 1.5rem;
  }

  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0.5rem 1.2rem;
    background: black;
    border: 1px solid #DBDBDB;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    color: white;
    border-radius: 4px;
    width: 85%;
  }

  input[type="submit"] {
    background-color: #0095F6;
    color: white;
    border: 1px solid #0095F6;
    cursor: pointer;
  }

  p {
    margin-top: 2rem;
  }

  span {
    color: #0095F6;
    cursor: pointer;
  }
`;

export default FormWrapper;