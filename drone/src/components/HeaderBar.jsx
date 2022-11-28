import React from 'react'
import "./HeaderBar.css"
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import { useState } from 'react'
import kaist from "../img/kaist.png"

const HeaderBar = ({isLogged}) => {
  
  let navigate = useNavigate();
  let pathDashboard = '/dashboard';
  let pathLogin = '/login';
  let pathRegister = '/register';

  const logout = () => {
    localStorage.removeItem('token')
    navigate(pathLogin)
  }
  
  return (
    <div className="mainNav">
      <img  className="logo" src={kaist} height="45rem" width="100rem" />
      <button className="navTitle" onClick={e=>navigate('/')}>The Horus Project</button>
      {/* <button className="button" onClick={e=>navigate(pathLogin)}>Login</button>
      <button className="button" onClick={e=>navigate(pathRegister)}>Register</button>
      <button className="button" onClick={e=>navigate(pathDashboard)}>Dashboard</button> */}
      { isLogged ? <button className="button" onClick={logout}>Logout</button> : ""}
    </div>
  )
}

export default HeaderBar
