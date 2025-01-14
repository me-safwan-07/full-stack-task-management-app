import react, { createContext, useContext, useState } from 'react';
import { loginApi, registerApi } from '../api/authApi'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (username, email, password) => {
        try {
            const token = await registerApi(username, email, password);
            localStorage.setItem('token', token);
            setUser(username);
        } catch (error) {
            throw error;
        }
    }

    const login = async (username, password) => {
        try {
            const token = await loginApi(username, password);
            localStorage.setItem('token', token);
            setUser(username);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};