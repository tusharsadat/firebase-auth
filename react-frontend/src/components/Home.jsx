import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="text-center bg-light p-5 shadow-sm rounded"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="display-4 mb-4">Welcome to Our App!</h1>
        <p className="lead mb-4">
          This is a professional authentication system with Firebase, React,
          Redux Toolkit, and Laravel.
        </p>
        <div>
          <Link to="/login">
            <Button variant="primary" className="m-2">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="success" className="m-2">
              Register
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Home;
