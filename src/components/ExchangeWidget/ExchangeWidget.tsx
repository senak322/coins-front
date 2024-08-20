// import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import "./ExchangeWidget.scss";
import { RootState } from "../../store/store";
import { changeAmount, changeCurrency } from "../../store/exchangeSlice";
import arrow from "../../images/exchange.svg";

// Валюты для выбора
const currencies = [
  { symbol: "BTC", name: "Bitcoin", icon: <FaBitcoin /> },
  { symbol: "ETH", name: "Ethereum", icon: <FaEthereum /> },
];

export default function ExchangeWidget() {
  const dispatch = useDispatch();
  const {
    amount,
    selectedCurrency,
    outputCurrency,
    outputAmount,
    exchangeRate,
  } = useSelector((state: RootState) => state.exchange);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAmount(parseFloat(e.target.value)));
  };

  const handleCurrencyChange = () => {
    dispatch(changeCurrency());
  };
  return (
    <div className={"container"}>
      <div className={"exchange-block"}>
        <div>
          <p className="you-p">You send:</p>
          <div className={"input-container"}>
            <input
              className={"input"}
              type="number"
              value={amount}
              onChange={handleInputChange}
            />
            <div className={"coin-select"}>
              <select>
                <option>BTC</option>
              </select>
            </div>
          </div>
        </div>

        <button className={"coin-button"} onClick={handleCurrencyChange}>
          <img src={arrow} alt="Поменять местами валюты" />
        </button>
        <div>
          <p className="you-p">You get:</p>
          <div className={"input-container"}>
            <input
              className={"input"}
              type="number"
              value={outputAmount.toFixed(8)}
              readOnly
            />
            <div className={"coin-select"}>
              <select>
                <option>ETH</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button className={"exchangeButton"}>CHANGE</button>
      <p className={"exchangeRate"}>
        exchange rate: 1 {selectedCurrency} ~ {exchangeRate} {outputCurrency}
      </p>
    </div>
  );
}
