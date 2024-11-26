import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../../components/navbar/Navbar_landing';

const Signup = () => {
    const [formData, setFormData] = useState({
        userAccId: '',
        userAccName: '',
        password: '',
        email: '',
        role: '',
        type: '',
        createdAt: '',
        updatedAt: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString();
        setFormData((prevData) => ({
            ...prevData,
            createdAt: currentDate,
            updatedAt: currentDate
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userAccounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage('User created successfully!');
                setFormData({
                    userAccId: '',
                    userAccName: '',
                    password: '',
                    email: '',
                    role: '',
                    type: '',
                    createdAt: '',
                    updatedAt: ''
                });
                setTimeout(() => {
                    navigate('/signin');
                }, 2000); // Redirect after 2 seconds
            } else {
                const error = await response.json();
                setMessage('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setMessage('Error signing up: ' + error.message);
        }
    };

    return (
        <div>
            <Navbar/>
        
        <div className={styles.signupContainer}>
            <h2>Sign Up</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="userAccId">User ID:</label>
                <input
                    type="text"
                    id="userAccId"
                    name="userAccId"
                    value={formData.userAccId}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="userAccName">Username:</label>
                <input
                    type="text"
                    id="userAccName"
                    name="userAccName"
                    value={formData.userAccName}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
                
                {/* Hidden fields for createdAt and updatedAt */}
                <input
                    type="hidden"
                    id="createdAt"
                    name="createdAt"
                    value={formData.createdAt}
                />
                <input
                    type="hidden"
                    id="updatedAt"
                    name="updatedAt"
                    value={formData.updatedAt}
                />
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    );
};

export default Signup;