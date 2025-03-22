import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-name">Profile</h2>

        <div className="profile-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-actions">
          <button className="profile-button edit">Save Changes</button>
          <button className="profile-button logout">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
