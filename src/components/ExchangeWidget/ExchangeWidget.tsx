// import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./ExchangeWidget.scss";
import { RootState } from "../../store/store";
import {
  setCurrency,
  reverseCurrencies,
  setSumGive,
  setSumReceive,
  setInputError,
  setStep,
  setName,
  setBankAccount,
  setAlert,
} from "../../store/exchangeSlice";
import arrow from "../../images/exchange.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { coins, banks } from "../../utils/config";
import {
 
  SelectChangeEvent,
} from "@mui/material";
// import { ReactNode } from "react";
import ExchangeItem from "../ExchangeItem/ExchangeItem";


export default function ExchangeWidget() {
  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleGiveInputChange = (value: number) => {
    dispatch(setSumGive(value));
  };
  const handleReceiveInputChange = (value: number) => {
    dispatch(setSumReceive(value));
  };

  const handleGiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "give", currency: currency }));
  };
  const handleReceiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "receive", currency: currency }));
  };

  const reverse = () => {
    dispatch(reverseCurrencies())
  }
  return (
    <div className={"container"}>
      <div className={"exchange-block"}>
        <ExchangeItem
          title="You send"
          handleInputChange={handleGiveInputChange}
          handleCurrencyChange={handleGiveCurrencyChange}
          way="give"
        />

        <button className={"coin-button"} onClick={reverse} type="button">
          <img className="coin-button__img" src={arrow} alt="Поменять местами валюты" />
        </button>
        <ExchangeItem
          title="You get"
          handleInputChange={handleReceiveInputChange}
          handleCurrencyChange={handleReceiveCurrencyChange}
          way="receive"
        />
      </div>

      <button className={"exchange-button"}>CHANGE</button>
      <p className={"exchange-rate"}>
        exchange rate: 1 {instances.give.selectedCurrency} ~ {"хз сколько"}{" "}
        {instances.receive.selectedCurrency}
      </p>
    </div>
  );
}
