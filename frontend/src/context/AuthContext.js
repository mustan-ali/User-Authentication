import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(localStorage.getItem('user'));
        }
    }, []);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData.email)
        localStorage.setItem('user', userData.email);
        localStorage.setItem('token', userData.token);
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};