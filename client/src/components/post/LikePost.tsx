import React, { useCallback, useEffect, useState } from "react";
import customToast from "../../util/customToast";
import FilledHeartIcon from "../iconComponents/filledHeart";
import HeartIcon from "../iconComponents/heart";

interface LikePostProps {
    isLiked: boolean;
    postId: string;
    increaseLikes: () => void;
    decreaseLikes: () => void;
}

const LikePost: React.FC<LikePostProps> = ({ isLiked, postId, increaseLikes, decreaseLikes}) => {
  // sets the like state of the post with the correct id
  // default value is set to false
  const [likedState, setLiked] = useState(isLiked);

  const isLikedFunc = useCallback(() => setLiked(isLiked), [isLiked]);

  useEffect(() => {
    // set like state to true after render
    isLikedFunc();
  }, [isLikedFunc]);

  /**
   * Handles what happens when the user likes a post
   */
  const handleToggleLike = async () => {
    if (likedState) {
      setLiked(false);
      decreaseLikes();

      const path: string = `/${postId}/like`;
      const api: RequestInit = { method: "GET", headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("token")
      }}

      try {
          const response = await fetch(path, api);

          const { data } = await response.json();

          return data;

      } catch(error) {
          return customToast(error.message);
      }

      
    } else {
      setLiked(true);
      increaseLikes();

      const path: string = `/${postId}/like`;
      const api: RequestInit = { method: "GET", headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("token")
      }}

      try {
          const response = await fetch(path, api);

          const { data } = await response.json();

          return data;

      } catch(error) {
          return customToast(error.message);
      }
      
    }
  };

  const likeState = () => {
    // if the like state is true
    if (likedState) {
        // return filled heart icon showing its liked
        return <FilledHeartIcon onClick={handleToggleLike} />;
    }

    // if like state is false
    if (!likedState) {
        // return normal heart icon showing its not liked
        return <HeartIcon onClick={handleToggleLike} />;
    }
  };

  return (
      <>
        {likeState()}
      </>
  );
};

export default LikePost;