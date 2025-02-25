import "./App.scss";
import "@mantine/core/styles.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainExchange from "./components/Main/MainExchange";
import AboutUs from "./pages/AboutUs/AboutUs";
import Rules from "./pages/Rules/Rules";
import AccountPage from "./pages/AccountPage/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountLayout from "./pages/AccountPage/AccountLayout";
import SecuritySettings from "./pages/SecuritySettings/SecuritySettings";
import UserAccounts from "./pages/UserAccounts/UserAccounts";
import { MantineProvider } from "@mantine/core";
import UserOperations from "./pages/UserOperations/UserOperations";
import PartnerAccount from "./pages/PartnerAccount/PartnerAccount";
import PartnerExchanges from "./pages/PartnerExchanges/PartnerExchanges";
import Referrals from "./pages/Referrals/Referrals";
import PartnerWithdraw from "./pages/PartnerWithdraw/PartnerWithdraw";
import { useEffect } from "react";
import { getMe } from "./utils/api";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { clearUser, setUser } from "./store/userSlice";
import useReferralCode from "./hooks/useReferralCode";
import AdminProtectedRoute from "./components/AdminProtectedRoute.";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminSettings from "./pages/AdminSettings/AdminSettings";
import AdminWithdrawals from "./pages/AdminWithdrawals/AdminWithdrawals";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useReferralCode();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token in localStorage");
      return;
    }

    getMe(token)
      .then((res) => {
        if (!res!.ok) {
          // navigate('/');
          // localStorage.removeItem('jwt');
          throw new Error("Token verify failed");
        }
        return res!.json();
      })
      .then((data) => {
        console.log("verify data:", data);
        dispatch(setUser(data.user));
        // Здесь ожидаем { message: 'Token is valid', user: { ... } }
      })
      .catch((error) => {
        navigate("/");
        localStorage.removeItem("jwt");
        dispatch(clearUser());
        console.error(error);
      });
  }, []);

  return (
    <MantineProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainExchange />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/rules" element={<Rules />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/account/data" />} />
            <Route path="data" element={<AccountPage />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="accounts" element={<UserAccounts />} />
            <Route path="operations" element={<UserOperations />} />
            <Route path="partners" element={<PartnerAccount />} />
            <Route path="bonuses" element={<PartnerExchanges />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="withdraw" element={<PartnerWithdraw />} />
            
          </Route>
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminPanel />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="orders" />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
