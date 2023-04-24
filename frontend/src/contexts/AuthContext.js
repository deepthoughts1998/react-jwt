import React, { createContext, useContext } from 'react'
import axios from 'axios'

const AuthContext=createContext()

export const useAuth=()=>{
    return useContext(AuthContext)
}

function AuthProvider({children}) {

    async function login(){
        const res = await axios.get("http://localhost:3001/auth/verify", {
            headers: { token: localStorage.token },
          });
          console.log(res.data)
          localStorage.setItem("user",JSON.stringify(res.data))
    }

    async function logout(){
        localStorage.removeItem("user")
    }

     function showUser(){
        console.log(JSON.parse(localStorage.getItem("user")))
        return JSON.parse(localStorage.getItem("user"))
    }

    
    const value={
        login,logout,showUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider