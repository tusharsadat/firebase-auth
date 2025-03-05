import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForgotPassword = async (data) => {
    try {
      await axios.post("http://localhost:8000/api/forgot-password", data);
      toast.success("Password reset link sent to your email!");
      reset(); // Clear input fields
    } catch (error) {
      console.error("Failed to send password reset link", error);
      toast.error("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <Form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
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
          <Button variant="primary" type="submit" className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
