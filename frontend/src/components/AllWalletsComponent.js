import React from "react";
import { Carousel, Card, Button, Container, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllWalletsComponent = ({ userid, getWallets, deleteWallet}) => {
const [wallets, setWallets] = useState([])
    useEffect(() => {

        getWallets()
        .then((res) => {
          setWallets(res.filter((wallet) => wallet.UserID == userid));
        })
        .catch(er => console.log(er));
      }, [wallets]);


const deleteHandler = async (walletid) => {
    console.log("wallet id", walletid)
    try {
        if (window.confirm("Are you sure?")) {
            const res = await deleteWallet(walletid)
            console.log("res", res)
            const updatedWallets = wallets.filter((wallet) => wallet.id !== walletid);
            setWallets(updatedWallets)
            }
    }
    catch (er) {
        console.log(er)
    }

}


  return (
    <Container className="border border-3 rounded mt-3 p-3">
                <h1 className="text-muted">
          My Wallets {"    "}
          <LinkContainer to={`/createwallet/${userid}`} >
            <Button variant="light" size="lg" className="ms-3">
              Create New Wallet
            </Button>
          </LinkContainer>

        </h1>

        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th  className="text-muted">Wallet Name</th>
              <th  className="text-muted">Wallet Number</th>
              <th  className="text-muted" style={{width:"50%"}}>Balance</th>
              <th  className="text-muted" style={{width:"10%"}}>Transfer</th>
              <th  className="text-muted" style={{width:"10%"}}>Close Wallet?</th>


            </tr>
          </thead>
          <tbody>
            {wallets?.map((wallet, idx) => (
              <tr key={idx}>
                <td>{wallet.Name}</td>
                <td>{wallet.id}</td>

                <td> {wallet.Balance} {wallet.Currency}</td>
                <td>
                  <LinkContainer to={`/transfer/${wallet.id}`}>
                    <Button className="btn-sm" variant="warning">
                      <i className="bi bi-arrow-left-right"></i>
                    </Button>
                  </LinkContainer>
                </td>
     
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(wallet.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

    </Container>
  );
};

export default AllWalletsComponent;


