import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Login</Button>
      <Button onClick={handleGoogleLogin} variant="danger">
        Login with Google
      </Button>
    </Form>
  );
};

export default Login;
