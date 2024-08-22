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
import { currencies } from "../../utils/config";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";
import ExchangeItem from "../ExchangeItem/ExchangeItem";

// Валюты для выбора

export default function ExchangeWidget() {
  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleGiveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSumGive(parseFloat(e.target.value)));
  };
  const handleReceiveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSumReceive(parseFloat(e.target.value)));
  };

  const handleGiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "give", currency: currency }));
  };
  return (
    <div className={"container"}>
      <div className={"exchange-block"}>
        <ExchangeItem
          title="You send"
          handleInputChange={handleGiveInputChange}
          handleCurrencyChange={handleGiveCurrencyChange}
        />

        <button className={"coin-button"}>
          <img src={arrow} alt="Поменять местами валюты" />
        </button>
        <ExchangeItem
          title="You get"
          handleInputChange={handleGiveInputChange}
          handleCurrencyChange={handleGiveCurrencyChange}
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
