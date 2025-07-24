import React, { Children, createContext, useContext, useState,useEffect } from "react";
export const UserDataContext = createContext();
import axios from "axios";
import { AuthDataContext } from "./AuthContext.jsx";


const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      setUserData(null);
      console.error("Error fetching current user:", error);
    }
  };
  useEffect(()=>{
    getCurrentUser();
  },[])
  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
