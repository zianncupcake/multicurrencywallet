import WalletsComponent from "../components/home/WalletsComponent";
import SpendingsComponent from "../components/home/SpendingsComponent";

import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import BucketsComponent from "../components/home/BucketsComponent";
import NavComponent from "../components/NavComponent";

const HomePage = () => {
  const [wallets, setWallets] = useState([]);
  const [spendings, setSpendings] = useState([]);
  const [buckets, setBuckets] = useState([]);

  const { id } = useParams();

  const getWallets = async () => {
    const { data } = await axios.get(`http://localhost:8000/Wallets/`);
    return data;
  };

  const getSpendings = async () => {
    const { data } = await axios.get(`http://localhost:8000/Spendings/`);
    return data;
  };

  useEffect(() => {
    getWallets().then((res) => {
      setWallets(res.filter((wallet) => wallet.UserID == id));
    });
  }, []);

  useEffect(() => {
    getSpendings().then((res1) => {
      console.log("res1", res1);
      setSpendings(res1.filter((spending) => spending.UserID == id));

      const cumulativeSums = [];

      res1.forEach((spending) => {
        const existingCategory = cumulativeSums.find(
          (item) => item.Category === spending.Category
        );
      
        if (existingCategory) {
          // Update existing category with the additional amount in the respective WalletCurrency
          const existingCurrencyIndex = existingCategory.Amount.findIndex(
            (currency) => Object.keys(currency)[0] === spending.WalletCurrency
          );
      
          if (existingCurrencyIndex !== -1) {
            // Currency exists, update the amount
            existingCategory.Amount[existingCurrencyIndex][spending.WalletCurrency] += spending.Amount;
          } else {
            // Currency doesn't exist, add a new object to the array
            existingCategory.Amount.push({
              [spending.WalletCurrency]: spending.Amount,
            });
          }
        } else {
          // Add a new category with the initial amount in the respective WalletCurrency
          const newCategory = {
            Category: spending.Category,
            Amount: [{ [spending.WalletCurrency]: spending.Amount }],
          };
          cumulativeSums.push(newCategory);
        }
      });
      
      setBuckets(cumulativeSums);
      console.log("cumulative sums", cumulativeSums);
                });
  }, []);

  return (
    <Row>
      <Col md={2} style={{paddingLeft:"40px", paddingRight:"0px"}} >
        <Row className="h-100" >
        <NavComponent userid={id}  />
        </Row>
      </Col>

      <Col md={10} className="px-5">
        <Row>
          <WalletsComponent wallets={wallets} userid={id} />
        </Row>
        <Row>
          <Col md={6} style={{paddingLeft:"0px", paddingRight:"10px"}}>
            <BucketsComponent
              buckets={buckets}
              userid={id}
            />
          </Col>
          <Col md={6} style={{paddingLeft:"10px", paddingRight:"0px"}}>
            <SpendingsComponent
              wallets={wallets}
              userid={id}
              spendings={spendings}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
