import React from "react";
import { Carousel, Card, Button, Container, Table, Form, Alert } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = ({ userid, getUser, editUser }) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    getUser(userid)
      .then((res) => {
        setUser(res);
      })
      .catch((er) => console.log(er));
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false)

    if (!editing) {
      setEditing(true)
      return
    }
    const form = event.currentTarget.elements;
    console.log("form", form);

    const formInputs = {
      FirstName: form.firstName.value,
      LastName: form.lastName.value,
      PhoneNumber: form.phoneNumber.value,
      Username: form.username.value,
      Password: form.password.value,
    };
    console.log("form input", formInputs);

    try {
      const res = await editUser(userid, formInputs);
      console.log("res", res);
      setSuccess(true);
      setEditing(false)
      console.log("user", user);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <Container className="border border-3 rounded mt-3 p-3">
      <h1 className="text-muted">My Profile {"    "}</h1>
      <Form onSubmit={handleSubmit} className="p-5 w-75 mx-auto">
        <Form.Group className="mb-3 mt-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            required
            type="text"
            maxLength="50"
            title="Please enter first name"
            defaultValue={user.FirstName}
            disabled={!editing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            required
            type="text"
            maxLength="50"
            title="Please enter last name"
            defaultValue={user.LastName}
            disabled={!editing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number (XXXX-XXXX)</Form.Label>
          <Form.Control
            name="phoneNumber"
            required
            type="tel"
            pattern="[0-9]{4}-[0-9]{4}"
            title="Please enter phone number in the format of xxxx-xxxx"
            defaultValue={user.PhoneNumber}
            disabled={!editing}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            required
            type="text"
            maxLength="50"
            title="Please enter username"
            defaultValue={user.Username}
            disabled={!editing}

          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            required
            type="password"
            maxLength="50"
            title="Please enter password"
            defaultValue={user.Password}
            disabled={!editing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button variant={editing? "success" : "primary"} className="w-100" type="submit">
            {editing ? "Confirm Update" : "Update User Details"}
          </Button>
        </Form.Group>
        <Form.Group>
          <Alert variant="success" className="mt-3" show={success}>
            Successfully edited user details
          </Alert>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ProfileComponent;
