import axios from "axios";
import LoginComponent from "../components/LoginComponent";


const LoginPage = () => {
    const getUsers = async (id) => {
        const { data } = await axios.get(`http://localhost:8000/Users/`);
        return data;
    }  
    
  
  return <LoginComponent getUsers={getUsers} />
};

export default LoginPage;

