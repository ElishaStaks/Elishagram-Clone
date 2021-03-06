import React, { useState, createContext, useContext } from "react";

type NewsfeedState = {
    likesCount: number;
    isLiked: boolean;
    commentsCount: number;
    comments: [
      {
        _id: string,
        user: {
          username: string;
          avatar: string;
        },
        text: string
      }
    ]
    files: [string];
    caption: string;
    isMine: boolean;
    _id: string;
    user: {
      avatar: string;
      username: string;
    }
    text: string; 
}

interface NewsfeedContextProps {
  newsfeed: NewsfeedState[];
  setNewsfeed: Function;
}

export const NewsFeedContext = createContext<NewsfeedContextProps>({
  newsfeed: [],
  setNewsfeed: () => null
})

export const NewsFeedProvider: React.FC = ({ children }) => {
  const [newsfeed, setNewsfeed] = useState<NewsfeedState[]>([]);

  return (
    <NewsFeedContext.Provider value={{ newsfeed, setNewsfeed }}>
      {children}
    </NewsFeedContext.Provider>
  );
};

export const useNewsFeedContext = () => useContext(NewsFeedContext);