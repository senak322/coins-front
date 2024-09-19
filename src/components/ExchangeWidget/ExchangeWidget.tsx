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
  const [lastChangedInput, setLastChangedInput] = useState<
    "give" | "receive" | null
  >(null);

  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive  } = useSelector((state: RootState) => state.exchange);

  const handleGiveInputChange = (value: string) => {
    dispatch(setSumGive(value));
    setLastChangedInput("give");
    const numValue = Number(value.replace(",", "."));
    if (!isNaN(numValue) && rate > 0) {
      const result = numValue * rate;
      // Получаем допустимое количество знаков после запятой для валюты "receive"
      const receiveCurrency = instances.receive.selectedCurrency;
      const receiveCurrencyObj = instances.receive.currencies.find(
        (c) => c.symbol === receiveCurrency
      );
      const allowedDecimalPlaces = receiveCurrencyObj?.decimalPlaces ?? 8;

      // Форматируем результат
      const formattedResult = result.toFixed(allowedDecimalPlaces);

      dispatch(setSumReceive(formattedResult));
    } else {
      dispatch(setSumReceive(""));
    }
  };
  const handleReceiveInputChange = (value: string) => {
    dispatch(setSumReceive(value));
    setLastChangedInput("receive");
    const numValue = Number(value.replace(",", "."));

    if (!isNaN(numValue) && rate > 0) {
      const result = numValue / rate;
      // Получаем допустимое количество знаков после запятой для валюты "give"
      const giveCurrency = instances.give.selectedCurrency;
      const giveCurrencyObj = instances.give.currencies.find(
        (c) => c.symbol === giveCurrency
      );
      const allowedDecimalPlaces = giveCurrencyObj?.decimalPlaces ?? 8;

      // Форматируем результат
      const formattedResult = result.toFixed(allowedDecimalPlaces);

      dispatch(setSumGive(formattedResult));
    } else {
      dispatch(setSumGive(""));
    }
  };

  const handleGiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "give", currency: currency }));
    // getRate(); // Обновляем курс при изменении валюты
  };
  const handleReceiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "receive", currency: currency }));
    // getRate(); // Обновляем курс при изменении валюты
  };

  const reverse = () => {
    dispatch(reverseCurrencies());
    // getRate();
  };

  const getRate = useCallback(async () => {
    const symbolMap: { [key: string]: string } = {
      Sber: "RUB",
      "T-Bank": "RUB",
      RUB: "RUB",
    };
    const giveCurrency =
      symbolMap[instances.give.selectedCurrency] ||
      instances.give.selectedCurrency.toUpperCase();
    const receiveCurrency =
      symbolMap[instances.receive.selectedCurrency] ||
      instances.receive.selectedCurrency.toUpperCase();

    try {
      const exchangeRate = await getExchangeRate(giveCurrency, receiveCurrency);
      setRate(exchangeRate); // Устанавливаем курс в состояние
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate(0); // В случае ошибки сбрасываем курс
    }
  }, [instances.give.selectedCurrency, instances.receive.selectedCurrency]);

  useEffect(() => {
    getRate();
  }, [getRate]);

  // useEffect(() => {
  //   if (instances.give.selectedCurrency && instances.receive.selectedCurrency && rate > 0) {
  //     handleGiveInputChange(sumGive);
  //   }
  // }, [rate, instances.give.selectedCurrency, instances.receive.selectedCurrency, handleGiveInputChange, sumGive]);

  useEffect(() => {
    if (lastChangedInput === "give" && sumGive !== "") {
      const numValue = Number(sumGive.replace(",", "."));
      if (!isNaN(numValue) && rate > 0) {
        const result = numValue * rate;
        const receiveCurrencyObj = instances.receive.currencies.find(
          (c) => c.symbol === instances.receive.selectedCurrency
        );
        const allowedDecimalPlaces = receiveCurrencyObj?.decimalPlaces ?? 8;
        const formattedResult = result.toFixed(allowedDecimalPlaces);
        dispatch(setSumReceive(formattedResult));
      } else {
        dispatch(setSumReceive(""));
      }
    } else if (lastChangedInput === "receive" && sumReceive !== "") {
      const numValue = Number(sumReceive.replace(",", "."));
      if (!isNaN(numValue) && rate > 0) {
        const result = numValue / rate;
        const giveCurrencyObj = instances.give.currencies.find(
          (c) => c.symbol === instances.give.selectedCurrency
        );
        const allowedDecimalPlaces = giveCurrencyObj?.decimalPlaces ?? 8;
        const formattedResult = result.toFixed(allowedDecimalPlaces);
        dispatch(setSumGive(formattedResult));
      } else {
        dispatch(setSumGive(""));
      }
    }
  }, [
    rate,
    instances.give.selectedCurrency,
    instances.receive.selectedCurrency,
  ]);

  return (
    <div className={"container"} id="widget">
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
