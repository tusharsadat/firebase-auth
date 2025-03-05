import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async (data) => {
    try {
      await axios.post(
        `http://localhost:8000/api/reset-password/${token}`,
        data
      );
      toast.success("Password reset successful!");
      reset(); // Clear input fields
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Password reset failed", error);
      toast.error("Password reset failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Reset Password</h2>
        <Form onSubmit={handleSubmit(handleResetPassword)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
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
          <Button variant="primary" type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
