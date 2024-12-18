import { useEffect, useState } from "react";
import "./Header.scss";

import { Link, useNavigate } from "react-router-dom";
import { getExchangeRates } from "../../utils/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleLanguage } from "../../store/languageSlice";
import SignInModal from "../Auth/SignInModal";
import SignUpModal from "../Auth/SignUpModal";

export default function Header() {
  const [rates, setRates] = useState<{
    [key: string]: { rub: number; usd: number };
  }>({});
  const dispatch = useAppDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  // Локальные стейты для контроля открытия/закрытия попапов
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const navigate = useNavigate();

  const getHeaderRate = async () => {
    try {
      const data = await getExchangeRates();
      if (data && data.rates) {
        setRates(data.rates);
      } else {
        console.error("No rates data received from backend.");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const translations = {
    ru: {
      change: "Обмен",
      language: "RU",
      sign: "Вход",
    },
    en: {
      change: "Change",
      language: "EN",
      sign: "Sign in"
    },
    
  };

  const toggleLang = () => {
    dispatch(toggleLanguage());
  };

  // Callback при успешном логине
  const handleSignInSuccess = () => {
    setSignInOpen(false);
    // Редирект на страницу account
    navigate("/account");
  };

  // Callback при успешной регистрации
  const handleSignUpSuccess = () => {
    setSignUpOpen(false);
    // Допустим, после регистрации тоже отправим в личный кабинет
    navigate("/account");
  };

  useEffect(() => {
    getHeaderRate();

    // Обновляем курсы каждые 5 минут (опционально)
    const interval = setInterval(() => {
      getHeaderRate();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header__coins-list">
        <div className="header__coins-list__content">
          {Object.keys(rates).map((currency) => (
            <div key={currency} className="header__coin">
              {currency} ≈ {rates[currency].usd} USD
            </div>
          ))}
          {Object.keys(rates).map((currency) => (
            <div key={`${currency}-duplicate`} className="header__coin">
              {currency} ≈ {rates[currency].usd} USD
            </div>
          ))}
        </div>
      </div>

      <div className="header__container">
        <Link to="/" className="header__title">
          Coins Change
        </Link>
        <div className="header__links">
          <button onClick={() => setSignInOpen(true)} className="header__link">
            {translations[currentLanguage].sign}
          </button>
          {/* <button onClick={() => setSignUpOpen(true)} className="header__link">
            Sign up
          </button> */}
          <button onClick={toggleLang} className="header__link">
            {translations[currentLanguage].language}
          </button>
        </div>
      </div>
      {/* Модалки: SignIn / SignUp */}
      <SignInModal
        open={isSignInOpen}
        onClose={() => setSignInOpen(false)}
        onSuccess={handleSignInSuccess}
        onRegisterClick={() => {
          setSignInOpen(false);
          setSignUpOpen(true);
        }}
      />
      <SignUpModal
        open={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSuccess={handleSignUpSuccess}
      />
    </header>
  );
}
