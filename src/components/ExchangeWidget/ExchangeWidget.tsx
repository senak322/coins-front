import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import "./ExchangeWidget.scss";
import { RootState } from "../../store/store";
import {
  setCurrency,
  reverseCurrencies,
  setSumGive,
  setSumReceive,
  // setInputError,
  // setStep,
  // setName,
  // setBankAccount,
  // setAlert,
} from "../../store/exchangeSlice";
import arrow from "../../images/exchange.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { coins, banks } from "../../utils/config";
import { SelectChangeEvent } from "@mui/material";
// import { ReactNode } from "react";
import ExchangeItem from "../ExchangeItem/ExchangeItem";

import { getExchangeRate } from "../../utils/api";

// Commission tiers
const commissionTiers = [
  { min: 1000, max: 15000, commission: 0.03 }, // 3% комиссия
  { min: 15000, max: 100000, commission: 0.02 }, // 2% комиссия
  { min: 100000, max: 10000000, commission: 0.1 }, // 1% комиссия
];

function getCommission(amount: number): number {
  for (const tier of commissionTiers) {
    if (amount >= tier.min && amount < tier.max) {
      return tier.commission;
    }
  }
  return 0; // Если сумма не попадает ни в один диапазон, комиссия 0%
}

export default function ExchangeWidget() {
  const [rate, setRate] = useState<number>(0);
  const [lastChangedInput, setLastChangedInput] = useState<
    "give" | "receive" | null
  >(null);

  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleGiveInputChange = (value: string) => {
    dispatch(setSumGive(value));
    setLastChangedInput("give");
    const numValue = Number(value.replace(",", "."));
    if (!isNaN(numValue) && rate > 0) {
      let adjustedRate = rate;

      // Проверяем, отправляет ли пользователь рубли
      if (
        instances.give.selectedCurrency === "Sber" ||
        instances.give.selectedCurrency === "T-bank"
      ) {
        const commissionRate = getCommission(numValue);
        console.log(commissionRate);
        
        // Вычитаем комиссию из курса
        adjustedRate = rate * (1 - commissionRate);
        console.log("rate" + rate);
        console.log("adjustedRate" + adjustedRate);
      } else if (
        instances.receive.selectedCurrency === "Sber" ||
        instances.receive.selectedCurrency === "T-bank"
      ) {
        // Если пользователь получает рубли, комиссия рассчитывается на основе суммы в рублях, которую он получит
        const estimatedRubAmount = numValue * rate;
        const commissionRate = getCommission(estimatedRubAmount);
        console.log(commissionRate);
        // Прибавляем комиссию к курсу
        adjustedRate = rate * (1 + commissionRate);
      }

      const result = numValue * adjustedRate;

      const receiveCurrencyObj = instances.receive.currencies.find(
        (c) => c.symbol === instances.receive.selectedCurrency
      );
      const allowedDecimalPlaces = receiveCurrencyObj?.decimalPlaces ?? 8;

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
      let adjustedRate = rate;

      // Проверяем, получает ли пользователь рубли
      if (
        instances.receive.selectedCurrency === "Sber" ||
        instances.receive.selectedCurrency === "T-bank"
      ) {
        const commissionRate = getCommission(numValue);
        // Прибавляем комиссию к курсу
        adjustedRate = rate * (1 + commissionRate);
      } else if (
        instances.give.selectedCurrency === "Sber" ||
        instances.give.selectedCurrency === "T-bank"
      ) {
        // Если пользователь отправляет рубли, комиссия рассчитывается на основе суммы в рублях, которую он отправляет
        const estimatedRubAmount = numValue / rate;
        const commissionRate = getCommission(estimatedRubAmount);
        // Вычитаем комиссию из курса
        adjustedRate = rate * (1 - commissionRate);
      }

      const result = numValue / adjustedRate;

      const giveCurrencyObj = instances.give.currencies.find(
        (c) => c.symbol === instances.give.selectedCurrency
      );
      const allowedDecimalPlaces = giveCurrencyObj?.decimalPlaces ?? 8;

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

  const getAdjustedRate = () => {
    let adjustedRate = rate;
    if (instances.give.selectedCurrency === "RUB") {
      const rubAmount = Number(sumGive) || 0;
      const commissionRate = getCommission(rubAmount);
      adjustedRate = rate * (1 - commissionRate);
    } else if (instances.receive.selectedCurrency === "RUB") {
      const rubAmount = Number(sumReceive) || 0;
      const commissionRate = getCommission(rubAmount);
      adjustedRate = rate * (1 + commissionRate);
    }
    return adjustedRate;
  };

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
      handleGiveInputChange(sumGive);
    } else if (lastChangedInput === "receive" && sumReceive !== "") {
      handleReceiveInputChange(sumReceive);
    }
  }, [
    rate,
    instances.give.selectedCurrency,
    instances.receive.selectedCurrency,
    lastChangedInput,
    sumGive,
    sumReceive,
    handleGiveInputChange,
    handleReceiveInputChange
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
        {rate ? getAdjustedRate().toFixed(4) : "Не удалось загрузить курс"}{" "}
        {instances.receive.selectedCurrency}
      </p>
    </div>
  );
}
