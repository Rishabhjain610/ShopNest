import React,{createContext,useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext';
export const UserDataContext = createContext();

const UserContext = ({children}) => {
  const [admin,setAdmin] = useState(null);
  const {serverUrl}=useContext(AuthDataContext);
  const getAdmin=async()=>{
    try {
      const response = await axios.get(`${serverUrl}/api/user/getadmin`,{
        withCredentials: true,
      });
      setAdmin(response.data);
      console.log("Admin data fetched successfully:", response.data);
     
    } catch (error) {
      console.error("Error fetching admin data:", error);
      
    }
  }
  const value={
    serverUrl,
    getAdmin,
    admin,
    setAdmin
  }
  useEffect(() => {
    getAdmin();
  }, []);
  
  return (
    <UserDataContext.Provider value={value}>
      {children}
   </UserDataContext.Provider>
  )
}

export default UserContext



