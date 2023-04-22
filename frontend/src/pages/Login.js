import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/Style.css";
import { NavLink } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";
import { login } from "../http/userAPI";
import { useState } from "react";

export default function Login() {
  const [Mail, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");

  const sigin = async () => {
    const response = await login(Mail, Password);
    console.log(response);
  };
  return (
    <div>
      <Form
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="text-center mb-4 text-primary">Jobson</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="email"
            placeholder="Enter email"
            value={Mail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={sigin}
          style={{ width: "165px" }}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
        <NavLink to={REGISTRATION_ROUTE}>
          <Button
            style={{ width: "165px" }}
            id="reg_But_logpage"
            variant="primary"
          >
            Registration
          </Button>
        </NavLink>
      </Form>
    </div>
  );
}
