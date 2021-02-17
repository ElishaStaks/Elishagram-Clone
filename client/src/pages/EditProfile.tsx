import React from "react";
import styled from "styled-components";
import ProfileEditForm from "../components/profile/ProfileEditForm";

const Wrapper = styled("div")`
  width: 930px;
  border: 1px solid #3f3f40;
  display: grid;
  background: #242526;

  .tabs {
    border-right: 1px solid #DBDBDB;
    padding: 1rem;
  }

  .profile-form-container {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 970px) {
    width: 90%;
  }

  @media screen and (max-width: 700px) {
    width: 98%;
  }

  @media screen and (max-width: 550px) {
    width: 99%;
  }
`;

const EditProfile: React.FC = () => {
    return (
        <Wrapper>
            <div className="profile-form-container">
                <ProfileEditForm />
            </div>
        </Wrapper>
    );
};

export default EditProfile;