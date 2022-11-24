import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard';
import HeaderBar from "./components/HeaderBar"
import jwt_decode from 'jwt-decode'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [isToken, setisToken] = useState(false)

 const checkToken = () => {
  let token = localStorage.getItem('token')
  const user = jwt_decode(token)
  if(user){
    console.log("trueeee")
    setisToken(true)
    return true
  }
  else {
    console.log("falseeee")
    setisToken(false)
    return false
  }
}

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={(checkToken === false) ? <Navigate to="login" /> : <Navigate to="/dashboard" />}
        />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
