import React from 'react';
import { useNavigate } from 'react-router-dom';




const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));  // Retrieve the user's info from localStorage
  const redirect = useNavigate();

  const redirectProduct = () => {
    redirect('/');

  }

  return (
    <div onClick={redirectProduct} className='profile-card'>
      <h1>Profile</h1>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile-picture" width="200vw" height="170vh"/>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      ) : (
        <h3 className='no-user'>No user information available.</h3>
      )}
    </div>
  );
};

export default Profile;
