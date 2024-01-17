import RegisterComponent from "../components/RegisterComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const RegisterPage = () => {

    const createUser = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8000/Users`, { ...formInputs });
        return data;
    }  
  
  return <RegisterComponent createUser={createUser}/>;
};

export default RegisterPage;

