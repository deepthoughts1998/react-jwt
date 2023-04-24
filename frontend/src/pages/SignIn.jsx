import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const {login}=useAuth()

  const regUser = async (e) => {
    e.preventDefault();
    try {
      console.log("here we go")
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data);
      await login()
      
      navigate("/")
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <form onSubmit={regUser}>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="password"
        />

        <button type="submit">login</button>
        <Link to="/signup">Create an account</Link>
      </form>
    </div>
  );
};
