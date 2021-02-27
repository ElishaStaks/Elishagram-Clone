import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../styles/Avatar";

const UserCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 280px;
  margin-top: 1rem;
  position: fixed;
  top: 6rem;
  left: 64.5%;


  span {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

interface UserCardProps {
    user: {
      username: string;
      avatar: string;
      fullname: string;
    }
}
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const history = useHistory();

  return (
    <UserCardWrapper>
      <Avatar
        className="pointer"
        onClick={() => history.push(`/${user.username}`)}
        src={user.avatar}
        alt="avatar"
      />

      <div className="user-info">
        <h3
          className="pointer"
          onClick={() => history.push(`/${user.username}`)}
        >
          <strong>{user.username}</strong>
        </h3>
        <span>{user.fullname}</span>
      </div>
    </UserCardWrapper>
  );
};

export default UserCard;