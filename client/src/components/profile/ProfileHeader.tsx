import React, {  useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { ProfileHeaderWrapper } from "../../styles/Profile";
import Follow from "../Follow";

const ProfileHeader: React.FC<any> = ({ profile }) => {
  const history = useHistory();
  const [followersState, setFollowers] = useState(0); // default follow state is 0
  const increaseFollowers = () => setFollowers(followersState + 1); // add followers
  const decreaseFollowers = () => setFollowers(followersState - 1); // remove followers

  useEffect(() => setFollowers(profile?.followersCount), [profile]); // set followers after rendering component

  return (
    <>
      <ProfileHeaderWrapper>
        <img className="avatar" src={profile?.avatar} alt="avatar" />
        <div className="profile-info">
          <div className="profile-meta">
            <h2>{profile?.username}</h2>
            {profile?.isMe ? (
              <div className="options">
                <button className="profile-button" onClick={() => history.push(`/${profile?.username}/edit`)}>
                  <strong>Edit Profile</strong>
                </button>
              </div>
            ) : (
              <Follow
                isFollowing={profile?.isFollowing}
                increaseFollowers={increaseFollowers}
                decreaseFollowers={decreaseFollowers}
                userId={profile?._id}
              />
            )}
          </div>

          <div className="profile-stats">
            <span><strong>{profile?.postCount}</strong> posts</span>

            <span>
              <strong>{profile?.followersCount}</strong> followers
            </span>

            <span>
              <strong>{profile?.followingCount}</strong> following
            </span>
          </div>

          <div className="bio">
            <p>{profile?.bio}</p>
          </div>
        </div>
      </ProfileHeaderWrapper>
    </>
  );
};

export default ProfileHeader;