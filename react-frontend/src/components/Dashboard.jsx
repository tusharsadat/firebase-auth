import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h2>Welcome, {user}!</h2>
        <p>This is your dashboard. You are logged in!</p>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Card>
    </Container>
  );
};

export default Dashboard;
