import React from "react";

import {
  Carousel,
  Card,
  Button,
  Container,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartComponent = ({ userid, getWallets, getSpendings }) => {
  const [wallets, setWallets] = useState([]);
  const [spendings, setSpendings] = useState([]);
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
  });
  useEffect(() => {
    getWallets()
      .then((res) => {
        setWallets(res.filter((wallet) => wallet.UserID == userid));
      })
      .catch((er) => console.log(er));
    getSpendings()
      .then((res) => {
        setSpendings(res.filter((spending) => spending.UserID == userid));
      })
      .catch((er) => console.log(er));
  }, []);

  const handleChange = async (e) => {
    const selectedWallet = e.target.value;

    if (!selectedWallet) {
      setChartData({
        series: [
          {
            data: [],
          },
        ],
      });
      return;
    }

    const filteredSpendings = spendings.filter(
      (spending) => spending.WalletID === selectedWallet
    );
    console.log("spendings", spendings);
    console.log("filteredspendings", filteredSpendings);
    const categoryTotals = filteredSpendings.reduce((totals, spending) => {
      const { Category, Amount } = spending;
      totals[Category] = (totals[Category] || 0) + Amount;
      return totals;
    }, {});

    const data = {
      series: [
        {
          data: Object.keys(categoryTotals).map((category, id) => ({
            id,
            value: categoryTotals[category],
            label: category,
          })),
        },
      ],
    };
    console.log(data);
    setChartData(data);
    console.log("chartData.series[0].data", data.series[0].data);
  };

  return (
    <Container className="border border-3 rounded mt-3 p-3">
      <Row>
        <h1 className="text-muted">Pie Charts{"    "}</h1>
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
                  <option value=""></option>
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
      <Row>
        {chartData ? (
          <PieChart
            series={[
              {
                data: chartData.series[0].data,
              },
            ]}
            width={600}
            height={200}
          />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default PieChartComponent;
