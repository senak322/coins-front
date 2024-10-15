import { useEffect, useState } from "react";
import "./Header.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Header() {
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const getHeaderRate = async () => {
    try {
      // Запрос к вашему бэкенду для получения курсов валют относительно рубля
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemulti",
        {
          params: {
            fsyms: "BTC,ETH,LTC,USDT,XMR,TON,DOGE,USDC,SOL,DAI,ADA",
            tsyms: "RUB",
          },
        }
      );

      const data = response.data;

      // Обновляем состояние с полученными курсами
      const newRates: { [key: string]: number } = {};
      Object.keys(data).forEach((currency) => {
        newRates[currency] = data[currency].RUB;
      });
      setRates(newRates);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
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
              {currency} ≈ {rates[currency]} RUB
            </div>
          ))}
          {Object.keys(rates).map((currency) => (
            <div key={`${currency}-duplicate`} className="header__coin">
              {currency} ≈ {rates[currency]} RUB
            </div>
          ))}
        </div>
      </div>

      <div className="header__container">
        <Link to="/" className="header__title">
          Coins Change
        </Link>
        <div className="header__links">
          <a href="#widget" className="header__link">
            Change
          </a>
          <button className="header__link">Language</button>
        </div>
      </div>
    </header>
  );
}
