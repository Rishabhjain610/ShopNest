import React,{useContext,createContext} from 'react'
import axios from 'axios'
import { AuthDataContext } from './authContext'
export const GeminiDataContext = createContext()    
const GeminiContext = ({children}) => {
  const {serverUrl} = useContext(AuthDataContext)
  const geminiResponse=async(message)=>{
    try {
      const response = await axios.post(`${serverUrl}/api/chatbot/chatbot`, { message },{withCredentials: true})
     console.log("Gemini response:", response.data)
      return response.data
    } catch (error) {
      console.error("Error fetching Gemini response:", error)
    }

  }
  const value={
    geminiResponse
  }
  return (
    <GeminiDataContext.Provider value={value}>
      {children}
    </GeminiDataContext.Provider>
  )
}

export default GeminiContext
