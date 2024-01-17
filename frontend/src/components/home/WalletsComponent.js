import React from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Test from "../../images/test.png";
import Test2 from "../../images/test2.png";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WalletsComponent = ({ wallets, userid }) => {
  const chunkSize = 3;
  const navigate= useNavigate()
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`/createwallet/${userid}`)
  };

  const generateCards = (data) => {
    return data.map((item) => (
      <React.Fragment >
        {item.Name=="Add Wallet" && (
          // <LinkContainer 
          // to={`/createwallet/${userid}`}
          // style={{ width: "25%", height: "100%"}}>
            <Card
              className="position-relative"
              style={{
                width: "25%",
                height: "100%",
                marginRight: "1%",
                zIndex:4


              }}
              onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
           >
              <Card.Img variant="top" src={isHovered? Test2 : Test} alt="hi"  style={{zIndex:0}} />
              <Card.Body className={`position-absolute text-center w-100 h-100 ${isHovered ? 'text-light' : 'text-grey'}`}>
                <div style={{ marginTop: "37%"}}>
                <Card.Title className="fs-2">
                  <i class="bi bi-plus-circle"></i>
                </Card.Title>
                <Card.Text>Add Wallet</Card.Text>
                </div>
              </Card.Body>
            </Card>
          // </LinkContainer>
        )}

        {item.Name!="Add Wallet" && (
          <Card
            className="position-relative"
            style={{ width: "25%", height: "100%", marginRight: "1%" }}
          >
            <Card.Img variant="top" src={Test} alt="hi" />
            <Card.Body className="position-absolute text-grey w-100 h-100">
              <div className="text-center" style={{ marginTop: "40%" }}>
                <Card.Title>{item.Name}</Card.Title>
                <Card.Text>
                  {item.Balance} {item.Currency}
                </Card.Text>
              </div>
              <div
                style={{
                  marginTop: "6%",
                  display: "flex",
                  gap: "2%",
                  justifyContent: "center",
                }}
              >
                <LinkContainer to={`/transfer/${item.id}`}>
                  <Button
                    className="btn-sm"
                    variant="warning"
                    style={{ zIndex: 3 }}
                  >
                    <i className="bi bi-arrow-left-right"></i> Transfer
                  </Button>
                </LinkContainer>
                <Button variant="danger" className="btn-sm">
                  <i className="bi bi-trash"></i> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </React.Fragment>
    ));
  };

  const tempWallets = [...wallets]
  tempWallets.push({Name:"Add Wallet"})

  // console.log(" wallets", wallets)
  // console.log(" temp wallets", tempWallets)


  const chunks = Array.from(
    { length: Math.ceil(tempWallets.length / chunkSize) },
    (_, index) => tempWallets.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <Container className="border border-3 rounded mt-3 p-3">
<Row>
        <Col xs={8}>
          <h2 className="text-muted">Wallets</h2>
        </Col>
        <Col xs={4} className="text-end">
          <a href={`/wallets/${userid}`} className="text-muted">View All {'>'}</a>
        </Col>
      </Row>    <Carousel interval={null} className="carousel-dark">
      {chunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div
            style={{ padding: "20px", paddingBottom: "35px", justifyContent: "center" }}
            className="d-flex"
          >
            {generateCards(chunk)}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </Container>
  );
};

export default WalletsComponent;

