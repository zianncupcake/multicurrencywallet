import TransferComponent from "../components/TransferComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const TransferPage = () => {

    const transfer = async (walletid, formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Wallets/${walletid}`, {...formInputs});
        return data;
    }  

    const getWallets = async () => {
        const { data } = await axios.get(`http://localhost:8000/Wallets/`);
        return data;
    }  

    const getWallet = async (walletid) => {
        const { data } = await axios.get(`http://localhost:8000/Wallets/${walletid}`);
        return data;
    }  

    const createTransaction = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8000/Transactions`, { ...formInputs });
        return data;
    }  
    
    const getExchangeRates = async () => {
        const { data } = await axios.get(`http://localhost:8000/ExchangeRates/`);
        return data;
    }  

  
  return <TransferComponent transfer={transfer} getWallet={getWallet} getWallets={getWallets} createTransaction={createTransaction} getExchangeRates={getExchangeRates} />;
};

export default TransferPage;

