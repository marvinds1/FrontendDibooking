import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage/home';
import About from './pages/Homepage/about';
import Register from './pages/Register/register';
import Login from './pages/Login/login';
import FieldDetails from './pages/FieldDetails/detailsProduct';
import PaymentDetails from './pages/Payment/paymentDetails';
import PaymentConfirmation from './pages/Payment/paymentConfirmation';
import AccountDetails from './pages/AccountDetails/accountDetails';
import Booking from './pages/Booking/booking';
import History from './pages/History/history';
import Dashboard from './pages/DashboardPengelola/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/detail/:id" element={<FieldDetails />} />
        <Route path="payment/:id" element={<PaymentDetails />} />
        <Route path="payment/confirmation" element={<PaymentConfirmation />} />
        <Route path="user" element={<AccountDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="history" element={<History />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
