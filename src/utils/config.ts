import btc from "../images/btc.png";
import eth from "../images/eth.svg";
import usdt from "../images/usdt.png";
import sber from "../images/sber.png";
import tinkof from "../images/tink.png";
import { ICurrency } from "../types/types";

export const currencies: ICurrency[] = [
  { symbol: "BTC", icon: btc, isBank: false },
  { symbol: "Sber", icon: sber, isBank: true },
  { symbol: "ETH", icon: eth, isBank: false },
  { symbol: "USDT", icon: usdt, isBank: false },
  { symbol: "T-Bank", icon: tinkof, isBank: true },
];
