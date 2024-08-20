import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import "./ExchangeWidget.module.scss";
// import { RootState } from '../store/store';
// import { changeAmount, changeCurrency } from '../store/exchangeSlice';

export default function ExchangeWidget() {
  
  // Валюты для выбора
  const currencies = [
    { symbol: 'BTC', name: 'Bitcoin', icon: <FaBitcoin /> },
    { symbol: 'ETH', name: 'Ethereum', icon: <FaEthereum /> },
  ];
  const dispatch = useDispatch();
  const { amount, selectedCurrency, outputCurrency, outputAmount, exchangeRate } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAmount(parseFloat(e.target.value)));
  };

  const handleCurrencyChange = () => {
    dispatch(changeCurrency());
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A new and easy way to change your coins!</h1>
      <p className={styles.subtitle}>Our project helps with buy, sell and change cryptocurrency</p>

      <div className={styles.exchangeBlock}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="number"
            value={amount}
            onChange={handleInputChange}
          />
          <div className={styles.coinSelect}>
            <span className={styles.iconWrapper}>
              {currencies.find((c) => c.symbol === selectedCurrency)?.icon}
              <span>{selectedCurrency}</span>
            </span>
            <button className={styles.coinButton} onClick={handleCurrencyChange}>
              ▼
            </button>
          </div>
        </div>

        <span className={styles.iconWrapper}>➔</span>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={outputAmount.toFixed(8)}
            readOnly
          />
          <div className={styles.coinSelect}>
            <span className={styles.iconWrapper}>
              {currencies.find((c) => c.symbol === outputCurrency)?.icon}
              <span>{outputCurrency}</span>
            </span>
          </div>
        </div>
      </div>

      <button className={styles.exchangeButton}>CHANGE</button>
      <p className={styles.exchangeRate}>
        exchange rate: 1 {selectedCurrency} ~ {exchangeRate} {outputCurrency}
      </p>
    </div>
  )
}
