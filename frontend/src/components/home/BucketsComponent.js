import React from "react";
import {
  Carousel,
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Test from "../../images/test.png";
import Test2 from "../../images/test2.png";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BucketsComponent = ({ buckets, userid }) => {
  console.log("buckets in component", buckets);
  const chunkSize = 3;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="border border-3 rounded mt-3 p-3">
      <Row>
        <Col xs={8}>
          <h2 className="text-muted">Buckets </h2>
        </Col>
        <Col xs={4} className="text-end">
          <a href={`/buckets/${userid}`} className="text-muted">
            View All {">"}
          </a>
        </Col>
      </Row>
      <Row>
        <Col >
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i
                  className="bi bi-cup-straw"
                  style={{ fontSize: "1.5em" }}
                ></i>
              </Card.Text>
              <Card.Text className="text-center text-muted">F&B</Card.Text>
              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "F&B")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <>
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </>
                    ))}
                  </div>
                ))}
      
  </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col >
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i className="bi bi-coin" style={{ fontSize: "1.5em" }}></i>
                
              </Card.Text>
              <Card.Text className="text-center text-muted">Recurring Payments</Card.Text>
              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "Recurring Payments")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <>
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </>
                    ))}
                  </div>
                ))}
      
  </Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col >
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i className="bi bi-airplane" style={{ fontSize: "1.5em" }}></i>
              </Card.Text>
              <Card.Text className="text-center text-muted">Travel</Card.Text>
              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "Travel")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <Row className="mb-0">
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </Row>
                    ))}
                  </div>
                ))}
      
  </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i
                  className="bi bi-bus-front"
                  style={{ fontSize: "1.5em" }}
                ></i>
              </Card.Text>
              <Card.Text className="text-center text-muted">Transport</Card.Text>

              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "Transport")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <>
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </>
                    ))}
                  </div>
                ))}
      
  </Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i className="bi bi-bag" style={{ fontSize: "1.5em" }}></i>
              </Card.Text>
              <Card.Text className="text-center text-muted">Shopping</Card.Text>

              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "Shopping")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <>
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </>
                    ))}
                  </div>
                ))}
      
  </Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text
                className="text-center text-muted"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-circle"
                  style={{ fontSize: "2.5em", position: "absolute" }}
                ></i>
                <i className="bi bi-receipt" style={{ fontSize: "1.5em" }}></i>
              </Card.Text>
              <Card.Text className="text-center text-muted">Utilities</Card.Text>
              <Card.Text className="text-center text-muted">
                {buckets
                .filter((bucket) => bucket.Category == "Utilities")
                .map((bucket) => (
                  <div>
                    {bucket.Amount.map((currencyAmount, index) => (
                      <Row >
                        {Object.entries(currencyAmount).map(([currencyKey, amountValue]) => (
                          <p >
                            {amountValue} {currencyKey}
                          </p>
                        ))}
                      </Row>
                    ))}
                  </div>
                ))}
      
  </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default BucketsComponent;

{
  /* <ListGroup variant="flush">
{cart.map((item, idx) => (
  <CartItemComponent
    idx={idx}
  />
))}
</ListGroup> */
}
