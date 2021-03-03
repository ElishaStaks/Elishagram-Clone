import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from '@material-ui/core';
import customToast from "../util/customToast";

export const Wrapper = styled("div")`
  .button {
    background-color: #0095f6;
    border: 1px solid #0095f6;
    background-color: #0095F6;
    color: #000;
    border-radius: 4px;
    margin-top: 1rem;
    margin-left: 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    color: white;
  }
`;

interface FollowProps {
    hasButton?: boolean;
    isFollowing: boolean;
    increaseFollowers?: () => void;
    decreaseFollowers?: () => void;
    userId: string;
}

const Follow: React.FC<FollowProps> = ({ hasButton, isFollowing, increaseFollowers, decreaseFollowers, userId }) => {
  const [followingState, setFollowingState] = useState(isFollowing);

  useEffect(() => setFollowingState(isFollowing), [isFollowing]);

  const api: RequestInit = { method: "GET", headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("token")
  }}

  const handleFollow = async () => {
    if (followingState) {
      setFollowingState(false);
      if (decreaseFollowers){
        decreaseFollowers();
      }

      const path: string = `/${userId}/unfollow`;
      try {
          const response = await fetch(path, api);

          const { data } = await response.json();

          return data;

      } catch(error) {
          return customToast(error.message);
      }
    } else {
      setFollowingState(true);
      if (increaseFollowers){
        increaseFollowers();
      }

      const path: string = `/${userId}/follow`;
      try {
          const response = await fetch(path, api);

          const { data } = await response.json();

          return data;

      } catch(error) {
          return customToast(error.message);
      }
    }
  };

  if (followingState) {
    return (
      <Wrapper>
        {hasButton ? (
          <span
          style={{ color: "#262626" }}
          className="pointer"
          onClick={() => handleFollow()}
          >
            Following
          </span>
        ) : (
          <div className="button">
            <Button onClick={() => handleFollow()}>Following</Button>
          </div>
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {hasButton ? (
          <span className="pointer" onClick={() => handleFollow()}>
            Follow
          </span>
        ) : (
          <div className="button">
            <Button  onClick={() => handleFollow()}>Follow</Button>
          </div>
        )}
      </Wrapper>
    );
  }
};

export default Follow;