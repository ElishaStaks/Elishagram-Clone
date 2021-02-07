import React, { useState, createContext, useContext } from "react";

export const NewsFeedContext = createContext<any>(null);

export const NewsFeedProvider: React.FC = ({ children }) => {
  const [newsFeed, setNewsFeed] = useState<any[]>([]);

  return (
    <NewsFeedContext.Provider value={{ newsFeed, setNewsFeed }}>
      {children}
    </NewsFeedContext.Provider>
  );
};

export const useNewsFeedContext = () => useContext(NewsFeedContext);