import btc from "../images/btc.png";
import eth from "../images/eth.svg";
import usdt from "../images/usdt.png";
import sber from "../images/sber.png";
import tbank from "../images/t-bank.png";
import { ICurrency } from "../types/types";

export const coins: ICurrency[] = [
  { symbol: "BTC", icon: btc, isBank: false, decimalPlaces: 8},
  { symbol: "ETH", icon: eth, isBank: false, decimalPlaces: 8},
  { symbol: "USDT", icon: usdt, isBank: false, decimalPlaces: 2 },
];

export const banks: ICurrency[] = [
  { symbol: "Sber", icon: sber, isBank: true, decimalPlaces: 0 },
  { symbol: "T-Bank", icon: tbank, isBank: true, decimalPlaces: 0 },
];

export const baseCurrencyUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
