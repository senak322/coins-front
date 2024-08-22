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
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

// Валюты для выбора

export default function ExchangeWidget() {
  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive, step } = useSelector(
    (state: RootState) => state.exchange
  );

  const handleGiveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSumGive(parseFloat(e.target.value)));
  };
  const handleReceiveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSumReceive(parseFloat(e.target.value)));
  };

  const handleGiveCurrencyChange = (
    e: SelectChangeEvent<string>, child: ReactNode
  ) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "give", currency: currency }));
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
              value={sumGive}
              onChange={handleGiveInputChange}
            />
            <div className={"input-container "}>
              <FormControl>
                
                <Select
                  displayEmpty
                  value={instances.give.selectedCurrency}
                  onChange={handleGiveCurrencyChange}
                  label="Currency"
                  className="custom-select"
                  renderValue={(value) => (
                    <div className="selected-item">
                      <img
                        src={
                          currencies.find((currency) => currency.symbol === value)?.icon
                        }
                        alt={value}
                        className="currency-icon"
                      />
                      {value}
                    </div>
                  )}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.symbol} value={currency.symbol}>
                      <div className="menu-item">
                        <img
                          src={currency.icon}
                          alt={currency.symbol}
                          className="currency-icon"
                        />
                        {currency.symbol}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <button className={"coin-button"}>
          <img src={arrow} alt="Поменять местами валюты" />
        </button>
        <div>
          <p className="you-p">You get:</p>
          <div className={"input-container"}>
            <input
              className={"input"}
              type="number"
              value={sumReceive}
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

      <button className={"exchange-button"}>CHANGE</button>
      <p className={"exchange-rate"}>
        exchange rate: 1 {instances.give.selectedCurrency} ~ {"хз сколько"}{" "}
        {instances.receive.selectedCurrency}
      </p>
    </div>
  );
}
