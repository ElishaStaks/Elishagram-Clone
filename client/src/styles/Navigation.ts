import styled from "styled-components";

export const NavWrapper = styled("div")`
  position: fixed;
  top: 0;
  width: 100%;
  background: #242526;
  border-bottom: 1px solid #3f3f40;
  padding: 1rem 0;
  z-index: 10;

  .nav-logo {
    position: relative;
    top: 6px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 930px;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    margin-left: 1rem;
  }

  @media screen and (max-width: 970px) {
    nav {
      width: 90%;
    }
  }

  @media screen and (max-width: 670px) {
    input {
      display: none;
    }
  }
`;

export const NavModalWrapper = styled("div")`
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

export const NavModalContentWrapper = styled("div")`
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
        border-bottom: 1px solid #DBDBDB;
        cursor: pointer;
    }
`;