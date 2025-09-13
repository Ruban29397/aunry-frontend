import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token on backend or decode locally
          const decoded = jwtDecode(token); // Decode locally without secret
          setUser(decoded.user);
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('https://aunry-backend.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Register function
  const register = async (username, password) => {
    try {
      const res = await axios.post('https://aunry-backend.onrender.com/api/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
