import { useEffect, useState } from "react";
import "./Header.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { getExchangeRates } from "../../utils/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleLanguage } from "../../store/languageSlice";
import SignInModal from "../Auth/SignInModal";
import SignUpModal from "../Auth/SignUpModal";

export default function Header() {
  const [tab, setTab] = useState('');
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      signOut: "Выйти",
      account: "Личный кабинет",
    },
    en: {
      change: "Change",
      language: "EN",
      sign: "Sign in",
      signOut: "Log out",
      account: "Account",
    },
  };

  const toggleLang = () => {
    dispatch(toggleLanguage());
  };

  // Callback при успешном логине
  const handleSignInSuccess = () => {
    setSignInOpen(false);
    setIsAuthenticated(true);
    // Редирект на страницу account
    navigate("/account");
  };

  // Callback при успешной регистрации
  const handleSignUpSuccess = () => {
    setSignUpOpen(false);
    // Допустим, после регистрации тоже отправим в личный кабинет
    navigate("/account");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Удаляем токен
    setIsAuthenticated(false); // Обновляем состояние
    navigate("/"); // Редирект на главную
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    getHeaderRate();

    // Обновляем курсы каждые 5 минут (опционально)
    const interval = setInterval(() => {
      getHeaderRate();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  // Проверяем токен при загрузке и смене маршрута
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [location]);

  useEffect(() => {
    setTab(location.pathname.replace(/^\//, ''));
    // console.log(location.pathname);
    
    
}, [location]);

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
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className={`header__link ${isActive("/") ? "active" : ""}`}
              >
                {translations[currentLanguage].change}
              </Link>
              <Link
                to="/account"
                className={`header__link ${
                  tab.startsWith('account') ? "active" : ""
                }`}
              >
                {translations[currentLanguage].account}
              </Link>
              <button
                onClick={handleLogout}
                className="header__link header__logout"
              >
                {translations[currentLanguage].signOut}
              </button>
            </>
          ) : (
            <button
              onClick={() => setSignInOpen(true)}
              className="header__link"
            >
              {translations[currentLanguage].sign}
            </button>
          )}
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
