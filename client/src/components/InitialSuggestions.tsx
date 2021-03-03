import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../styles/Avatar";
import customToast from "../util/customToast";
import Follow from "./Follow";
import LoadSpinner from "./LoadSpinner";

const Wrapper = styled("div")`
  background: #242526;
  border: 1px solid #3f3f40;
  width: 600px;
  padding: 1rem;
  justify-self: center;

  .suggestion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  button {
    font-size: 0.9rem;
    position: relative;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }

  @media screen and (max-width: 530px) {
    width: 450px;
  }

  @media screen and (max-width: 480px) {
    width: 380px;
  }

  @media screen and (max-width: 400px) {
    width: 340px;

    button {
      font-size: 0.8rem;
    }
  }
`;

interface UserSuggestionProps {
    _id: string;
    username: string;
    avatar: string;
    isFollowing: boolean;
    fullname: string;
}

const InitialSuggestions = () => {
  const [users, setUsers] = useState<UserSuggestionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchUsers = useCallback(async() => {
    const path = "/users";
    const api: RequestInit = {method: "GET", headers: {
      "Content-Type":"application/json",
      "Authorization":"Bearer " + localStorage.getItem("token")
    }}

    try {
      const response = await fetch(path, api);
      const { data } = await response.json();

      setUsers(data);
      setLoading(false);
    } catch(error) {
      customToast(error.message);
    }
  }, []);

  useEffect(() => {
      fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "0.7rem" }}>Suggestions for you</h3>
      <Wrapper>
        {users.map((user) => (
          <div key={user._id} className="suggestion">
            <div className="user-info">
              <Avatar
                className="pointer"
                onClick={() => history.push(`/${user.username}`)}
                src={user.avatar}
                alt="avatar"
              />
              <div className="user-meta">
                <h4
                  className="pointer"
                  onClick={() => history.push(`/${user.username}`)}
                >
                  {user.username}
                </h4>
                <span className="secondary">{user.fullname}</span>
              </div>
            </div>
            <Follow isFollowing={user.isFollowing} userId={user._id} />
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default InitialSuggestions;
