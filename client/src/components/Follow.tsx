import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Button = styled("button")`
    background-color: #0095f6;
    border: 1px solid #0095f6;
    background-color: #0095F6;
    color: #000;
    padding: 0.4rem .5rem;
    border-radius: 4px;
    margin-top: 1rem;
    margin-left: 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    color: white;
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

  const handleFollow = () => {
    if (followingState) {
      setFollowingState(false);
      if (decreaseFollowers){
        decreaseFollowers();
      }

      fetch(`/${userId}/unfollow`, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("token")
        }
      }).then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            return data;
          } else {
            return Promise.reject(data);
          }
      });

    } else {
      setFollowingState(true);
      if (increaseFollowers){
        increaseFollowers();
      }
      
      fetch(`/${userId}/follow`, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("token")
        }
      }).then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            return data;
          } else {
            return Promise.reject(data);
          }
      });
    }
  };

  if (followingState) {
    return (
      <>
        {hasButton ? (
          <span
            style={{ color: "#262626" }}
            className="pointer"
            onClick={() => handleFollow()}
          >
            Following
          </span>
        ) : (
          <Button onClick={() => handleFollow()}>Following</Button>
        )}
      </>
    );
  } else {
    return (
      <>
        {hasButton ? (
          <span className="pointer" onClick={() => handleFollow()}>
            Follow
          </span>
        ) : (
          <Button onClick={() => handleFollow()}>Follow</Button>
        )}
      </>
    );
  }
};

export default Follow;