import "./index.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

import { Form, Button, Col, Row } from "react-bootstrap";

export default function Login() {
  const [valid, setValid] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      try {
        const { data } = await login({
          variables: { ...formState },
        });

        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }

      // clear form values
      setFormState({
        email: "",
        password: "",
      });
    }
    setValid(true);
  };

  return (
    <Row className="justify-content-center pt-5 mt-5">
      <Col xxl={4} xl={5} lg={6} md={7} sm={9} xs={10}>
        {data ? (
          window.location.assign("/")
        ) : (
          <Form
            noValidate
            validated={valid}
            onSubmit={handleSubmit}
            id='login-form'
          >
            <Form.Group className="mb-4">
              <Form.Label hidden={true}>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label hidden={true}>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Row className="justify-content-center">
              <Button className="col" variant="primary" type="submit">
                Log In
              </Button>
            </Row>
          </Form>
        )}
      </Col>
    </Row>
  );
}
