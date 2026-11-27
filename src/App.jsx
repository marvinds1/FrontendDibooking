import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/Homepage/home'));
const About = lazy(() => import('./pages/Homepage/about'));
const Register = lazy(() => import('./pages/Register/register'));
const Login = lazy(() => import('./pages/Login/login'));
const FieldDetails = lazy(() => import('./pages/FieldDetails/detailsProduct'));
const PaymentDetails = lazy(() => import('./pages/Payment/paymentDetails'));
const PaymentConfirmation = lazy(() => import('./pages/Payment/paymentConfirmation'));
const AccountDetails = lazy(() => import('./pages/AccountDetails/accountDetails'));
const Booking = lazy(() => import('./pages/Booking/booking'));
const History = lazy(() => import('./pages/History/history'));
const Dashboard = lazy(() => import('./pages/DashboardPengelola/index'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
