// SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignedOutNav from '../../components/navbar/Navbar_vendor'; // Import the SignedOutNav component


const SignOut = () => {
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
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;
