
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NavComponent from "../components/NavComponent";
import AllWalletsComponent from "../components/AllWalletsComponent";
import axios from "axios"
import AllTransactionsComponent from "../components/AllTransactionsComponent";


const AllTransactionsPage = () => {
    const [wallets, setWallets] = useState([]);
    const [spendings, setSpendings] = useState([]);
    const [buckets, setBuckets] = useState([]);

    const getWallets = async () => {
        const { data } = await axios.get(`http://localhost:8000/Wallets/`);
        return data;
      };
    
      const getSpendings = async () => {
        const { data } = await axios.get(`http://localhost:8000/Spendings/`);
        return data;
      };

    const { id } = useParams();
  
    return (
      <Row style={{ height: "900px" }}>
        <Col md={2} style={{paddingLeft:"40px", paddingRight:"0px"}} >
          <Row className="h-100" >
          <NavComponent userid={id}  />
          </Row>
        </Col>
  
        <Col md={10} className="px-5">
            <Row className="h-100" >
                <AllTransactionsComponent getWallets={getWallets} userid={id} getSpendings={getSpendings}/>
            </Row>
        </Col>
      </Row>
    );
  };
  
  export default AllTransactionsPage;
  