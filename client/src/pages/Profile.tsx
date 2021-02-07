import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import PostPreview from "../components/profile/PostPreview";
import LoadSpinner from "../components/LoadSpinner";
import NoPostYet from "../components/NoPost";

const Wrapper = styled.div`
  hr {
    border: 0.5px solid #DBDBDB;
  }
`;

const Profile: React.FC = () => {
  const { username } = useParams<Record<string, string | undefined>>();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/${username}`, {
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
    }).then((res) => {
        setLoading(false);
        setProfile(res.data);
      }).catch((err) => console.log(err));
  }, [username]);

    if (loading) {
      return <LoadSpinner />;
  }

  return (
    <Wrapper>
      <ProfileHeader profile={profile} />
      <hr />
        <>
          {profile?.posts?.length === 0 ? (
            <NoPostYet />
          ) : (
            <PostPreview posts={profile?.posts} />
          )}
        </>
      
    </Wrapper>
  );
};

export default Profile;