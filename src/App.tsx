import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainExchange from "./components/Main/MainExchange";
import AboutUs from "./pages/AboutUs/AboutUs";
import Rules from "./pages/Rules/Rules";
import AccountPage from "./pages/AccountPage/AccountPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainExchange />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
