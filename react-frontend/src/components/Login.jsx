import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      dispatch(setUser({ user: data.email, token: response.data.token }));
      toast.success("Login successful!");
      reset(); // Clear input fields
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUser({ user: result.user.email, token: "google-token" }));
      toast.success("Google login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Login</h2>
        <Form onSubmit={handleSubmit(handleLogin)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              isInvalid={errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              isInvalid={errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
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
