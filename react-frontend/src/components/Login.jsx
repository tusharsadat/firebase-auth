import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      dispatch(setUser({ user: email, token: response.data.token }));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUser({ user: result.user.email, token: "google-token" }));
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Login
          </Button>
          <Button
            variant="danger"
            className="w-100"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
