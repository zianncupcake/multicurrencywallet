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
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { useState, useEffect } from "react";
  
  const CreateWalletComponent = ({ createWallet }) => {
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const navigate = useNavigate()
  
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget.elements;
      console.log("form", form);
  
      const formInputs = {
        Name: form.name.value,
        Currency: form.currency.value,
        Balance: parseInt(form.startingBalance.value),
        UserID: id,
      };
      console.log("form input", formInputs);
  
      try {
        const res = await createWallet(formInputs);
        console.log("res", res);
        setSuccess(true);
      } catch (er) {
        console.log(er);
      }
    };

    const goBack = () => {
      // This will go back to the previous page
      navigate(-1);
    };
  
  
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={2}>
          <Button className="btn btn-primary my-3" onClick={goBack}>
              Back to Dashboard
            </Button>
            </Col>
          <Col md={9}>
            <h1>Open New Wallet</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Wallet Name</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  maxLength="50"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  name="currency"
                  aria-label="Default select example"
                  required
                  onChange={handleCurrencyChange}
                >
                  <option value=""></option>
                  <option value="SGD">SGD</option>
                  <option value="EUR">EUR</option>
                  <option value="JPY">JPY</option>
                  <option value="USD">USD</option>

                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Starting Balance</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                  {selectedCurrency && (
    <span className="input-group-text">
      {selectedCurrency === 'SGD' && 'S$'}
      {selectedCurrency === 'EUR' && '€'}
      {selectedCurrency === 'JPY' && '¥'}
      {selectedCurrency === 'USD' && '$'}
    </span>
  )}                  
  </div>
                  <Form.Control
                    name="startingBalance"
                    required
                    type="number"
                    step="0.01"
                    title="Please enter starting balance"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="primary" className="w-100" type="submit">
                  Open Wallet
                </Button>
              </Form.Group>
              <Form.Group>
                <Alert variant="success" className="mt-3" show={success}>
                  Wallet opened successfully
                </Alert>
              </Form.Group>
  
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default CreateWalletComponent;
  