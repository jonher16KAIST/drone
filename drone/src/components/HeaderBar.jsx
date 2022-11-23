import React from 'react'
import "./HeaderBar.css"
import { useNavigate } from 'react-router-dom'

const HeaderBar = () => {

  let navigate = useNavigate();
  let pathDashboard = '/dashboard';
  let pathLogin = '/login';
  let pathRegister = '/register';

  return (
    <div className="mainNav">
      <button className="navTitle" onClick={e=>navigate(pathLogin)}>Building Detection by Drone Project</button>
      <button className="button" onClick={e=>navigate(pathLogin)}>Login</button>
      <button className="button" onClick={e=>navigate(pathRegister)}>Register</button>
      <button className="button" onClick={e=>navigate(pathDashboard)}>Dashboard</button>
    </div>
  )
}

export default HeaderBar
