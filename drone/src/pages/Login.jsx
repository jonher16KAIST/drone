import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Login = () => {

    // const userRef = userRef();
    // const errRef = userRef();

    // const [user, setUser] = useState('');
    // const [pwd, setPwd] = useState('');
    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState('');

    // useEffect(() => {
    //   userRef.current.focus()

    // }, [])
    // useEffect(() => {
    //     setErrMsg('')
  
    //   }, [user,pwd])
    

  return (

    <div className="p-5 d-flex justify-content-center">
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Please login
          </Card.Subtitle>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
