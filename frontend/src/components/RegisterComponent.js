import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
  } from "react-bootstrap";
  import { Link, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
//   import { useAuth } from "../context/UserContext";

  
  const RegisterComponent = ({ createUser }) => {
    const [success, setSuccess] = useState(false);
  
    //TEMPORARILY BEFORE LOGIN COMPONENT
    // const { login,user } = useAuth();
    // const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            const res = await createUser(formInputs)
            console.log("res", res)
            setSuccess(true)
            // navigate(`/balances/${res.id}`)
            // console.log("user", user)
          } catch (er) {
            console.log(er)
          }
    
  
    }
    
    const navigate = useNavigate()
    const goBack = () => {
      // This will go back to the previous page
      navigate(-1);
    };
  
    

  
    return (
      <Container>
        <Row className="justify-content-md-center mt-5 p-5">
        <Col md={2}>
            <Button className="btn btn-light my-3" onClick={goBack}>
              Back to login
            </Button>
          </Col>
          <Col md={9}>
            <h1 className="text-muted">Register With Us!</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  required
                  type="text"
                  maxLength="50"
                  title="Please enter first name"
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
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="text"
                  maxLength="50"
                  title="Please enter password"

                />
              </Form.Group>
              <Form.Group className="mb-3">
              <Button variant="primary" className="w-100" type="submit">
                  Register
                </Button>
              </Form.Group>
              <Form.Group>
              <Alert variant="success" className="mt-3" show={success}>
               Registration successful. You can login now
              </Alert>

              </Form.Group>

              <Row>
              </Row>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default RegisterComponent;
  