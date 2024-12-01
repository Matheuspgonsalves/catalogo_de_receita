import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    const [userId, setUserId] = useState(storedUserId);
    const [token, setToken] = useState(storedToken);

    const logout = () => {
        setUserId(null);
        setToken(null);
    };

    useEffect(() => {
        if (userId && token) {
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        }
    }, [userId, token]);

    return (
        <AuthContext.Provider value={{ userId, setUserId, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
