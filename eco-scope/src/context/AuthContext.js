import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Add state to store user ID

  useEffect(() => {
    // Check if user is already logged in (e.g., using token in localStorage)
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId'); // Retrieve stored user ID
    if (token) {
      setIsAuthenticated(true);
      setUserId(storedUserId); // Set user ID if token exists
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', id); // Store user ID
    setIsAuthenticated(true);
    setUserId(id); // Update user ID state
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); // Clear user ID
    setIsAuthenticated(false);
    setUserId(null); // Reset user ID state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
