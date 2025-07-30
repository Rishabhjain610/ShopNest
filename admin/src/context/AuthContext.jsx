import React, { createContext } from 'react';

export const AuthDataContext = createContext();

const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:3000";
  const value = {
    serverUrl
  };
  
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;