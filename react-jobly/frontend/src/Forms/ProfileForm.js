import UserData from "../UserDataContext";
import React, { useState, useContext } from "react";
import JoblyApi from "../api";

const Profile = () => {
  const { user, setUser } = useContext(UserData);

  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProfileData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let newProfileData = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      password: profileData.password,
    };
    let updatedUser = await JoblyApi.save(profileData.username, newProfileData);

    setUser(updatedUser);
  }

  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="lastName"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={profileData.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Save changes</button>
      </form>
    </div>
  );
};

export default Profile;
