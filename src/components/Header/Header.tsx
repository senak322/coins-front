import { useEffect, useState } from "react";
import "./Header.scss";

import { Link } from "react-router-dom";
import { getExchangeRates } from "../../utils/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleLanguage } from "../../store/languageSlice";

export default function Header() {
  const [rates, setRates] = useState<{ [key: string]: { rub: number; usd: number }  }>({});
  const dispatch = useAppDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

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
    },
    en: {
      change: "Change",
      language: "EN",
    },
  };

  const toggleLang = () => {
    dispatch(toggleLanguage());
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
          {/* <a href="#widget" className="header__link">
            {translations[currentLanguage].change}
          </a> */}
          <button onClick={toggleLang} className="header__link">
            {translations[currentLanguage].language}
          </button>
        </div>
      </div>
    </header>
  );
}
