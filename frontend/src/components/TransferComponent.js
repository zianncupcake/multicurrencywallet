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
// import { debounce } from 'lodash';
const TransferComponent = ({
  transfer,
  getWallets,
  getWallet,
  createTransaction,
  getExchangeRates
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState({});
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [sourceValue, setSourceValue] = useState(null);
  const [targetValue, setTargetValue] = useState(null);

  useEffect(() => {
    getWallet(id)
      .then((res) => {
        setWallet(res);
        getWallets()
          .then((res2) => {
            setWallets(
              res2.filter(
                (wallet) => wallet.UserID == res.UserID && wallet.id != res.id
              )
            );
          })
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));

    getExchangeRates()
    .then ((res) => setExchangeRates(res))
    .catch((er) => console.log(er))
  }, [wallet, wallets]);

  const goBack = () => {
    // This will go back to the previous page
    navigate(-1);
  };



  const handleWalletChange = (event) => {
    setSelectedWallet(
      wallets.find((wallet) => wallet.id == event.target.value)
    );
  };



  const handleSourceChange = (event) => {

    const amount = parseFloat(event.target.value)


    const conversion = exchangeRates.find((exchange) => exchange.Base==wallet.Currency && exchange.Target==selectedWallet.Currency)
        setTargetValue(parseFloat((amount * conversion.Rate).toFixed(2)));
        setSourceValue(amount)
    };

  const handleTargetChange = (event) => {

    const amount = parseFloat(event.target.value)

    const conversion = exchangeRates.find((exchange) => exchange.Base==selectedWallet.Currency && exchange.Target==wallet.Currency)
    setSourceValue(parseFloat((amount * conversion.Rate).toFixed(2)));
    setTargetValue(amount)
        };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(false);
    setSuccess(false);

    const form = event.currentTarget.elements;
    console.log("form", form);
    const newBalance1 =
      parseFloat(wallet.Balance) -
      sourceValue

    if (newBalance1 < 0) {
      setShowAlert(true);
      return;
    }

    const newBalance2 =
      parseFloat(selectedWallet.Balance) +
     targetValue;

    const sourceInputs = {
      Name: wallet.Name,
      Balance: newBalance1,
      Currency: wallet.Currency,
      UserID: wallet.UserID,
    };
    console.log("form input payer", sourceInputs);

    const targetInputs = {
      Name: selectedWallet.Name,
      Balance: newBalance2,
      Currency: selectedWallet.Currency,
      UserID: selectedWallet.UserID,
    };
    console.log("form input payee", targetInputs);

    const currentDate = new Date();
    const dateString = currentDate.toString();

    // Find the index of "GMT" in the string
    const gmtIndex = dateString.indexOf("GMT");

    // Extract the substring up to "GMT"
    const formattedDate = dateString.substring(0, gmtIndex).trim();

    console.log(formattedDate);

    const TransferformInputs = {
      SourceWallet: id,
      TargetWallet: selectedWallet.id,
      SourceAmount: sourceValue,
      TargetAmount: targetValue,
      SourceCurrency: wallet.Currency,
      TargetCurrency: selectedWallet.Currency,
      TransactionDate: formattedDate,
    };
    console.log("form input transfer", TransferformInputs);

    try {
      const res1 = await transfer(id, sourceInputs);
      console.log("res1", res1);
      const res2 = await transfer(selectedWallet.id, targetInputs);
      console.log("res2", res2);
      const res3 = await createTransaction(TransferformInputs);
      console.log("res3", res3);

      setSuccess(true);
    } catch (er) {
      console.log(er);
    }
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
          <h1>{wallet.Name}</h1>

          <div className="mb-3 mt-3">
            <p>
              <strong>Exisiting Balance:</strong> {wallet.Currency}{" "}
              {wallet.Balance}
            </p>
          </div>
          <div className="mb-5 mt-5">
            <p>
              <strong> Transfer To:</strong>
            </p>
          </div>
          {/*  */}
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
              <Form.Label>Wallet Name</Form.Label>
              <Form.Select
                name="walletName"
                aria-label="Default select example"
                required
                onChange={(e) => handleWalletChange(e)}
              >
                <option value=""></option>
                {wallets?.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.Name}
                  </option>
                ))}{" "}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transfer Amount</Form.Label>

              <div className="d-flex align-items-center">
                {/* First input group for source currency */}
                <div className="input-group mr-2">
                  <div className="input-group-prepend">
                  {wallet.Currency && (
    <span className="input-group-text">
      {wallet.Currency === 'SGD' && 'S$'}
      {wallet.Currency === 'EUR' && '€'}
      {wallet.Currency === 'JPY' && '¥'}
      {wallet.Currency === 'USD' && '$'}
    </span>
  )}                  
                  </div>
                  <Form.Control
                    name="sourceTransferAmount"
                    required
                    type="number"
                    step="0.01"
                    placeholder="Source Currency"
                    value = {sourceValue}
                    onChange={(e) => handleSourceChange(e)}
                    disabled={ !selectedWallet || (selectedWallet && Object.keys(selectedWallet).length === 0)}
                  />
                </div>

                {/* Arrow character */}
                <div className="mx-2">&#8594;</div>
                {/* Second input group for target currency */}
                <div className="input-group">
                  <div className="input-group-prepend">
                  {selectedWallet && selectedWallet.Currency && (
    <span className="input-group-text">
      {selectedWallet.Currency === 'SGD' && 'S$'}
      {selectedWallet.Currency === 'EUR' && '€'}
      {selectedWallet.Currency === 'JPY' && '¥'}
      {selectedWallet.Currency === 'USD' && '$'}
    </span>
  )}                  
                  </div>
                  <Form.Control
                    name="targetTransferAmount"
                    required
                    type="number"
                    step="0.01"
                    placeholder="Target Currency"
                    value={targetValue}
                    onChange={(e) => handleTargetChange(e)}
                    disabled={ !selectedWallet || (selectedWallet && Object.keys(selectedWallet).length === 0)}
                  />
                </div>
              </div>

              {/* <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <Form.Control
                    name="transferAmount"
                    required
                    type="number"
                    step="0.01"
                  />
                </div> */}
            </Form.Group>
            {/* <Form.Group className="mb-3 mt-3">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control name="message" type="text" maxLength="255" />
            </Form.Group>
            <Form.Group className="mb-3 mt-5">
              <Form.Label>Send as E-Gift</Form.Label>
              <Form.Check
                type="checkbox"
                name="egift"
                inline
                style={{
                  marginLeft: "15px",
                  opacity: 1,
                  transform: "scale(1.3)",
                }}
                size="lg"
              />
            </Form.Group> */}

            <Form.Group className="mb-3 mt-4">
              <Button variant="primary" className="w-100" type="submit">
                Transfer
              </Button>
            </Form.Group>
            <Form.Group>
              <Alert variant="success" className="mt-3" show={success}>
                Successfully made a transfer
              </Alert>
            </Form.Group>
            <Alert variant="danger" className="mt-3" show={showAlert}>
              Transfer amount more than account balance
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TransferComponent;
