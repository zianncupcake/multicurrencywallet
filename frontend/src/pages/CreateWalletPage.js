import CreateWalletComponent from "../components/CreateWalletComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const CreateWalletPage = () => {

    const createWallet = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8000/Wallets`, { ...formInputs });
        return data;
    }  
  
  return <CreateWalletComponent createWallet={createWallet}/>;
};

export default CreateWalletPage;

