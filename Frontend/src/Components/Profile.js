import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import "../Profile.css"


const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div class="profile-card">
      <h3 class="profile-name">{user.FirstName}</h3>
      <p class="profile-bio"> You are an alvigha application user and you are special to us! </p>

    </div>
  )
}

export default Profile

