import React from "react";
import styled from "styled-components";
import noPost from "../assets/noPost.png";

export const Wrapper = styled("div")`
    text-align: center;
    padding-top: 30px;

    img {
        width: 90px;
        height: 90px;
    }
`;

/**
 * component renders this if there is no posts from a user in their profile
 */
const NoPostYet: React.FC = () => {

    return (
        <Wrapper>
            <img src={noPost} alt="no post" />
            <h2>No Posts Yet</h2>
        </Wrapper>     
    );
}

export default NoPostYet;