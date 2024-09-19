import { useEffect, useState } from "react";
import "./Header.scss";
import axios from "axios";

export default function Header() {
  const [rateData, setRateData] = useState({
    btc: 0,
    eth: 0,
    ltc: 0,
    usdt: 0,
    xmr: 0,
    ton: 0,
  });

  const getHeaderRate = async () => {
    try {
      // Запрос к cryptocompare API
      const response = await axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
        params: {
          fsyms: 'BTC,ETH,LTC,USDT,XMR,TON',
          tsyms: 'USD',
        },
      });
      
      const rubRes = await axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
        params: {
          fsyms: 'BTC,ETH,LTC,USDT,XMR,TON',
          tsyms: 'RUB',
        },
      });

      const data = response.data;
      console.log(rubRes.data);
      
      // Обновляем состояние с полученными курсами
      setRateData({
        btc: data.BTC.USD,
        eth: data.ETH.USD,
        ltc: data.LTC.USD,
        usdt: data.USDT.USD,
        xmr: data.XMR.USD,
        ton: data.TON.USD,
      });
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
      <ul className="header__coins-list">
        <li>BTC ≈ {rateData.btc} USD</li>
        <li>ETH ≈ {rateData.eth} USD</li>
        <li>LTC ≈ {rateData.ltc} USD</li>
        <li>USDT ≈ {rateData.usdt} USD</li>
        {/* <li>XMR ≈ {rateData.xmr} USD</li> */}
        <li>TON ≈ {rateData.ton} USD</li>
      </ul>

      <div className="header__container">
        <h1 className="header__title">Coins Change</h1>
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
