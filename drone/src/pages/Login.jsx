import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import HeaderBar from "../components/HeaderBar";
import "./LoginRegister.css";

const Login = () => {

  const server = {ip: '192.168.0.105', port: "1337"}

  const navigate = useNavigate()

  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  async function loginUser(event) {
    event.preventDefault()
    const response = await fetch(`http://${server.ip}:${server.port}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pwd,
      }),
    })
    const data = await response.json()
    console.log(data)
    if(data.user){
      localStorage.setItem('token', data.user)
      alert("Login successful!")
      navigate("/dashboard")
    } else {
      alert('Error: Your email and password do not match. Please try again.')
      //setPwd('')
      //setEmail('')
    }
  }

    
  return (
    <>
    <HeaderBar />
    <div className="mainform p-5 d-flex justify-content-center">
    <Card className="card1" style={{ width: "50rem" }}>
      <Card.Body>
        <Card.Title>Login</Card.Title> 
        <Card.Subtitle className="mb-2 text-muted">
          Please login
        </Card.Subtitle>

        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <Card.Subtitle className="mt-2 text-muted">
          Not registered? <Link to="/register">Go to register page</Link>
        </Card.Subtitle>
        </Form>
      </Card.Body>
    </Card>
  </div>
  </>
  );
};

export default Login;
