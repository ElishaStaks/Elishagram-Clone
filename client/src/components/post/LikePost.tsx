import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // set like state to true after render
    setLiked(isLiked);
  }, [isLiked]);

  /**
   * Handles what happens when the user likes a post
   */
  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      decreaseLikes();

      // request correct api in server
      fetch(`${postId}/like`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
        },
      }).then(async (res) => {
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
      });

    } else {
      setLiked(true);
      increaseLikes();
      fetch(`${postId}/like`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
        },
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