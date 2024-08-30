import btc from "../images/btc.png";
import eth from "../images/eth.svg";
import usdt from "../images/usdt.png";
import sber from "../images/sber.png";
import tbank from "../images/t-bank.png";
import { ICurrency } from "../types/types";

export const coins: ICurrency[] = [
  { symbol: "BTC", icon: btc, isBank: false },
  { symbol: "ETH", icon: eth, isBank: false },
  { symbol: "USDT", icon: usdt, isBank: false },
];

export const banks: ICurrency[] = [
  { symbol: "Sber", icon: sber, isBank: true },
  { symbol: "T-Bank", icon: tbank, isBank: true },
];
