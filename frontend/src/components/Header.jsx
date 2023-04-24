import React,{useState,useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom"

export const Header = () => {

  
  const { logout,showUser } = useAuth();

  const navigate=useNavigate()

  let x=showUser()
  const handleLogout=async ()=>{
    localStorage.removeItem("token")
    await logout()
    navigate("/signin")
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center">
          <Navbar.Brand href="#home">HomePage</Navbar.Brand>
          
          { x ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Hi <a>{x.name}</a>
              </Navbar.Text>

              <Button className="mx-2 primary" onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
          ):(<Button className="mx-2 primary" onClick={()=>{
            navigate("/signin")
          }}>Login</Button>)}
        </Container>
      </Navbar>
    </>
  );
};
