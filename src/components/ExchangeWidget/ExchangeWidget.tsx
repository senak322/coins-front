import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
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
import { SelectChangeEvent } from "@mui/material";
// import { ReactNode } from "react";
import ExchangeItem from "../ExchangeItem/ExchangeItem";

import { getExchangeRate } from "../../utils/api";

export default function ExchangeWidget() {
  const [rate, setRate] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleGiveInputChange = (value: number | "") => {
    const numValue = Number(value)
    if (numValue > 0 && rate > 0) {
      dispatch(setSumGive(numValue));
      // const resSum = value * rate
      dispatch(setSumReceive(numValue * rate));
    }
  };
  const handleReceiveInputChange = (value: number | "") => {
    const numValue = Number(value)
    dispatch(setSumReceive(numValue));
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
    dispatch(reverseCurrencies());
  };

  const getRate = useCallback(async () => {
    const giveCurrency = instances.give.isBank
      ? "rub"
      : instances.give.selectedCurrency;
    const receiveCurrency = instances.receive.isBank
      ? "rub"
      : instances.receive.selectedCurrency;

    try {
      const exchangeRate = await getExchangeRate(giveCurrency, receiveCurrency);
      setRate(exchangeRate); // Устанавливаем курс в состояние
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate(0); // В случае ошибки сбрасываем курс
    }
  }, [
    instances.give.isBank,
    instances.receive.isBank,
    instances.give.selectedCurrency,
    instances.receive.selectedCurrency,
  ]);

  useEffect(() => {
    getRate();
  }, [getRate]);

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
          <img
            className="coin-button__img"
            src={arrow}
            alt="Поменять местами валюты"
          />
        </button>
        <ExchangeItem
          title="You get"
          handleInputChange={handleReceiveInputChange}
          handleCurrencyChange={handleReceiveCurrencyChange}
          way="receive"
        />
      </div>

      <button className={"exchange-button"}>CHANGE</button>
      <p className="exchange-rate">
        exchange rate: 1 {instances.give.selectedCurrency} ~{" "}
        {rate ? rate.toFixed(2) : "Не удалось загрузить курс"}{" "}
        {instances.receive.selectedCurrency}
      </p>
    </div>
  );
}
