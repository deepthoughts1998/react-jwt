import React, { useState } from 'react'
import axios from "axios"

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regUser = async (e) => {
    e.preventDefault();
    try {
      console.log("here we go")
      const res = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password
      });
      console.log(res)
    } catch (error) {
      console.log("error bn")
      console.log(error.response.data);
      console.log("empty")
    }
  };
  return (
    <div>
      <form onSubmit={regUser}>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="name"
        />
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
