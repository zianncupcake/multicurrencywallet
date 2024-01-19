import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import CreateWalletPage from './pages/CreateWalletPage';
import TransferPage from './pages/TransferPage';
import HomePage from './pages/HomePage';
import AllWalletsPage from './pages/AllWalletsPage';
import AllBucketsPage from './pages/AllBucketsPage';
import AllTransactionsPage from './pages/AllTransactionsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
    {/* <HeaderComponent /> */}
      <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createwallet/:id" element={<CreateWalletPage />} />
      <Route path="/transfer/:id" element={<TransferPage />} />
      <Route path="/home/:id" element={<HomePage />} />
      <Route path="/wallets/:id" element={<AllWalletsPage />} />
      <Route path="/buckets/:id" element={<AllBucketsPage />} />
      <Route path="/transactions/:id" element={<AllTransactionsPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/" element={<LoginPage />} />


      {/* <Route path="/edituserdetails/:id" element={<EditUserDetailsPage />} />
      
      <Route path="/balances/:id" element={<BalancesPage />} />
      <Route path="/deposit/:id" element={<DepositPage />} />
      <Route path="/withdraw/:id" element={<WithdrawPage />} />
      <Route path="/transactions/:id" element={<TransactionsPage />} />
      <Route path="/" element={<LoginPage />} />
 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
