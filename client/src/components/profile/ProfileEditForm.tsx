import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../../contexts/User/UserContext';
import Avatar from '../../styles/Avatar';
import { ProfileEditFormWrapper } from '../../styles/Profile';
import customToast from '../../util/customToast';

const ProfileEditForm: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUserContext();

  // All editable details the form will offer are in their own states as they will be changing
  const [username, setUsername] = useState(user.username); 
  const [fullname, setFullname] = useState(user.fullname);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [newAvatar, setNewAvatar] = useState("");
    
  const uploadImage = (file: string) => {
        const data = new FormData();
        // append file which we have from the image the user chooses
        data.append("file", file);
        // append upload preset which is the name of the preset in cloudinary (cloud-based image and video management services)
        data.append("upload_preset", "elishagram");
        // append your cloud name from cloudinary
        data.append("cloud_name", "insta-image-cloud");

        return fetch("https://api.cloudinary.com/v1_1/insta-image-cloud/image/upload", {
            method: "POST",
            body: data
        }).then((response) => response.json());
  }

  const onFileSelect = (event: any) => {
        if (event.target.files[0]) {
            uploadImage(event.target.files[0]).then((response) => {
                setNewAvatar(response.secure_url);
            });
        }
  };

  const editProfile = (event: any) => {
    event.preventDefault();

    if (!fullname) {
      customToast("Name field should not be empty");
    }

    if (!username) {
      customToast("Username field should not be empty");
    }

    if (!email) {
      customToast("Email field should not be empty");
    }

    const body = {
      username: username,
      fullname: fullname,
      bio: bio,
      email: email,
      avatar: newAvatar || user.avatar
    }

    fetch(`/${username}`, {
      method: "PUT",
      headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(body)
    }).then(async (response) => {
      const data = await response.json();
            
      if (response.ok) {
          return data;
      } else {
          return Promise.reject(data);
      }
    }).then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push(`/${user.username || body.username}`);
    }).catch((error) => customToast(error.message));
  };

  return (
      <ProfileEditFormWrapper>
          <form onSubmit={editProfile}>
              <div className="input-group change-avatar">
                  <div>
                      <label htmlFor="change-avatar">
                        <Avatar src={newAvatar? newAvatar : user.avatar} alt="avatar" />
                      </label>
                      <input id="change-avatar" accept="image/*" type="file" onChange={onFileSelect} /> 
                  </div>
                  <div className="change-avatar-meta">
                      <h3>{user.username}</h3>
                      <label htmlFor="change-avatar-link">
                          <span>Change Profile Photo</span>
                      </label>
                      <input id="change-avatar-link" accept="image/*" type="file" onChange={onFileSelect} />
                  </div> 
              </div>

              <div className="input-group">
                  <label><strong>Name</strong></label>
                  <input type="text" value={fullname} onChange={(event) => setFullname(event.target.value)} />
              </div>

              <div className="input-group">
                  <label><strong>Username</strong></label>
                  <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
              </div>
              <div className="input-group textarea-group">
                  <label><strong>Bio</strong></label>
                  <textarea cols={5} value={bio? bio : ""} onChange={(event) => setBio(event.target.value)}> </textarea>
              </div>

              <div className="input-group">
                  <p><strong>Personal Information</strong></p>
                  <p>Provide or change your personal information.</p>

                  <label><strong>Email</strong></label>
                  <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <button className="submit-button">Submit</button>
          </form>
      </ProfileEditFormWrapper>
  );
};

export default ProfileEditForm;