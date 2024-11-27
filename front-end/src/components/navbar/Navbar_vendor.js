import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/mavericks_logo_small.png';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
//import SignOut from '../../sections/auth/SignOut.js';
import { useUserContext } from '../../sections/auth/UserContext'; // Import the context
//const userAccountId = localStorage.getItem('userAccountId');

// Navbar to use when user signed in

// Navbar to use when user signed in
function SignedInNav() {
  const { userAccountId, userAccName,userAccId, userRole } = useUserContext(); // Access userAccountId,AccID, Name and role from context
  console.log('userAcountId', userAccountId)
  console.log('userAccName', userAccName)
  console.log('userAccId', userAccId)
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
        // Make a request to the server to handle sign-out
        await axios.post(`${process.env.REACT_APP_API_URL}/api/signout`);
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Redirect to the sign-in page
        navigate('/signin');
    } catch (error) {
        console.error('There was an error signing out!', error);
    }
};
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand" href="#">
      <img src={image} alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
      FlowerCatalogue
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/vendor-main">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/vendor-add-flower">Add Flower</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/vendor-view-flower-list">View Catalogue</Link>
        </li>
      </ul>
    </div>
    <div class="vendorDrop">
    <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userAccName ? `user: ${userAccName}` : 'Guest'}
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/vendor-profile-management">Manage Profile</Link></li>
            <li><a class="dropdown-item" onClick={handleSignOut}>Sign Out</a></li>
          </ul>
        </li>
    </div>
  </div>
</nav>
    )
}
export default SignedInNav;