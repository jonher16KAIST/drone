import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import "./LoginRegister.css";

const Login = () => {

  const server = {ip: '192.168.0.105', port: "1337"}

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch(`http://${server.ip}:${server.port}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        pwd,
      }),
    })
    const data = await response.json()
    console.log(data)
    if(data.status ==='ok'){
      alert("User registered successfully. Now please login.")
      navigate("/login")
    }
  }

  return (
    <div className="mainform p-5 d-flex justify-content-center">
      <Card className="card2" style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Title>Register</Card.Title> 
          <Card.Subtitle className="mb-2 text-muted">
            Please register
          </Card.Subtitle>

          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
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
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
