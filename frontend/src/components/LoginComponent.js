import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginComponent = ({getUsers}) => {
  const [validated, setValidated] = useState(false);
//   const [incompleteAlert, setincompleteAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlert2, setErrorAlert2] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorAlert(false)
    setErrorAlert2(false)

    //gets all form elements. elements is property of the form element that returns a collection of all form controls within the form
    const form = event.currentTarget.elements;
    console.log("form", form);

    const username = form.username.value;
    const password = form.password.value;

    let users;

    try {
        users = await getUsers()
        console.log("users", users)
    } catch (er) {
        console.log(er)
    }

    const userFound = users.find(user => user.Username === username)
    console.log("userfound" ,userFound)
    if (!userFound) {
        setErrorAlert(true)
        return 
    }

    if (userFound.Password != password) {
        setErrorAlert2(true)
        return
    }

    navigate(`/home/${userFound.id}`)

  };

  
  
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center p-5">

        <Col md={6}>

          <h1 className="text-muted">Login</h1>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                required
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
            <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>

            </Form.Group>

            <Row className="mt-2 w-100">
              <Col>
                Don't you have an account?
                <Link to={"/register"}> Register </Link>
              </Col>
            </Row>

            <br></br>
            <Row>
              <Alert show={errorAlert} variant="danger" className="text-center" >
                No user found
              </Alert>
            </Row>
            <Row>
              <Alert show={errorAlert2} variant="danger" className="text-center" >
                Wrong password
              </Alert>
            </Row>

            {/* <Row>
              <Alert show={incompleteAlert} variant="danger">
                Please input all fields
              </Alert>
            </Row> */}

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
