import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUserContext = () => {
    return useContext(UserContext);
};

// Context provider component
export const UserProvider = ({ children }) => {
    const [userAccountId, setUserAccountId] = useState(localStorage.getItem('userAccountId') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [userAcctId, setUserAcctId] = useState(localStorage.getItem('userAcctId') || null);
    const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
    const [userAccName, setUserAccName] = useState(localStorage.getItem('userAccName') || null);


    const updateUser = (userData) => {
        setUserAccountId(userData.userAccountId);
        setToken(userData.token);
        setUserRole(userData.userRole);
        setUserAcctId(userData.userAcctId);
        setUserAccName(userData.userAccName);
        setUserType(userData.userType);
        

        

        // Optionally, store in localStorage
        localStorage.setItem('userAccountId', userData.userAccountId);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userRole', userData.userRole);
        localStorage.setItem('userAcctId', userData.userAcctId);
        localStorage.setItem('userType', userData.userType);   
    };

    return (
        <UserContext.Provider value={{ userAccountId, token, userRole, userAcctId, userType, userAccName, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

