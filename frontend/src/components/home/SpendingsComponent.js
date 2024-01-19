import React from "react";
import { Carousel, Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Test from "../../images/test.png";
import Test2 from "../../images/test2.png";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpendingsComponent = ({ spendings, userid, wallets }) => {
    console.log("spendings in component", spendings)
  const chunkSize = 3;
  const navigate= useNavigate()
  const [isHovered, setIsHovered] = useState(false);


  return (
    <Container className="border border-3 rounded mt-3 p-3">
<Row>
        <Col xs={8}>
          <h2 className="text-muted"> Transactions </h2>
        </Col>
        <Col xs={4} className="text-end">
          <a href={`/transactions/${userid}`}className="text-muted">View All {'>'}</a>
        </Col>
      </Row>    
      <ListGroup>
        {
            spendings.slice(-5).reverse().map((spending) => (
                <ListGroup.Item>
                    <Row>
                        <Col md={8} className="px-4">
                            <Row style={{ fontSize: '20px' }}>
                        {spending.Description}
                        </Row>
                        <Row className="text-muted" >
                        {spending.WalletName}
                        </Row>
                        </Col>
                        <Col md={4} className="px-4" >
                            <Row className="justify-content-end" style={{ fontSize: '20px' }} >
                                -{spending.Amount} {spending.WalletCurrency} 
                            </Row>
                            <Row className="justify-content-end">
                                {spending.ShortenedDate}
                            </Row>

                        </Col>
                    </Row>
                </ListGroup.Item>
            ))
        }


      </ListGroup>

    </Container>
  );
};

export default SpendingsComponent;


