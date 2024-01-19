import React from "react";
import { Carousel, Card, Button, Container, Table, Row, Col, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllTransactionsComponent = ({ userid, getWallets, getSpendings}) => {
const [wallets, setWallets] = useState([]);
const [spendings, setSpendings] = useState([]);
const [filteredSpendings, setFilteredSpendings] = useState([]);


useEffect(() => {
  getWallets()
    .then((res) => {
      setWallets(res.filter((wallet) => wallet.UserID == userid));
    })
    .catch((er) => console.log(er));
  getSpendings()
    .then((res) => {
      setSpendings(res.filter((spending) => spending.UserID == userid));
      setFilteredSpendings(res.filter((spending) => spending.UserID == userid))
    })
    .catch((er) => console.log(er));
}, []);

const handleChange = async (e) => {
  const selectedWallet = e.target.value;

  if (selectedWallet == "") {
    return
  }

  if (selectedWallet =="All") {
    setFilteredSpendings(spendings)
  } else {
  setFilteredSpendings(spendings.filter((spending) => spending.WalletID == selectedWallet))
  }
}
  return (
    <Container className="border border-3 rounded mt-3 p-3">
      <Row>
        <h1 className="text-muted">My Transactions{"    "}</h1>
      </Row>
      <Row>
        <Col md={4}>
          <Form onChange={(e) => handleChange(e)}>
            <Form.Group className="mb-5 mt-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Filter By Wallet:</span>
                </div>
                <Form.Select name="account" aria-label="Default select example">
                  <option value="All">All</option>
                  {wallets?.map((wallet) => (
                    <option value={wallet.id}>
                      {wallet.id}: {wallet.Name}
                    </option>
                  ))}{" "}
                </Form.Select>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col md={8}></Col>
      </Row>

      <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Wallet</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpendings && filteredSpendings
              .sort(
                (a, b) =>
                  new Date(b.TransactionDate) - new Date(a.TransactionDate)
              )
              .map((spending, idx) => (
                <tr key={idx}>
                  <td>{spending.Description}</td>
                  <td>{spending.WalletName}</td>
                  <td>{spending.Category}</td>
                  <td>      {spending.WalletCurrency === 'SGD' && 'S$'}
      {spending.WalletCurrency === 'EUR' && '€'}
      {spending.WalletCurrency === 'JPY' && '¥'}
      {spending.WalletCurrency === 'USD' && '$'}
      {" "}{spending.Amount}</td>
                  <td>{spending.TransactionDate}</td>
                </tr>
              ))}
          </tbody>
        </Table>

    </Container>
  );
};

export default AllTransactionsComponent;


