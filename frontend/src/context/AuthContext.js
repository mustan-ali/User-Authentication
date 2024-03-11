import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (token) {
                try {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token })
                    });

                    if (res.status === 200) {
                        setUser(user);
                    } else {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
        };

        checkToken();
    }, []);

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
