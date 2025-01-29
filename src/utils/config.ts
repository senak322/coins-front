import btc from "../images/btc.png";
import eth from "../images/eth.svg";
import usdt from "../images/usdt.png";
import sber from "../images/sber.svg";
import tbank from "../images/t-bank.png";
import ton from "../images/ton.png";
import xmr from "../images/monero.png";
import trx from "../images/trx.png";
import doge from "../images/dogecoin.png";
import usdc from "../images/usdc.png";
import ltc from "../images/litecoin.png";
import sol from "../images/solana.png";
import dai from "../images/dai.png";
import ada from "../images/cardano.png";
import alfa from "../images/alfa.png";
import sbp from "../images/sbp.svg";
import vtb from "../images/VTB.png";
import raif from "../images/raif.png";
import gaz from "../images/gaz.png";
import ros from "../images/ros.png";
import mts from "../images/mts.png";
import ozon from "../images/ozon.jpg";
import uralsib from "../images/uralsib.svg";
import akbars from "../images/akbars.svg";
import rshb from "../images/rshb.png";
import psb from "../images/psb.jpg";
import you from "../images/you.png";
import pay from "../images/pay.jpg";

import { ICurrency } from "../types/types";

export const coins: ICurrency[] = [
  { symbol: "BTC", icon: btc, isBank: false, decimalPlaces: 8 },
  { symbol: "ETH", icon: eth, isBank: false, decimalPlaces: 8 },
  { symbol: "USDT", icon: usdt, isBank: false, decimalPlaces: 2 },
  { symbol: "TON", icon: ton, isBank: false, decimalPlaces: 4 },
  { symbol: "XMR", icon: xmr, isBank: false, decimalPlaces: 4 },
  { symbol: "TRX", icon: trx, isBank: false, decimalPlaces: 2 },
  { symbol: "DOGE", icon: doge, isBank: false, decimalPlaces: 2 },
  { symbol: "USDC", icon: usdc, isBank: false, decimalPlaces: 2 },
  { symbol: "LTC", icon: ltc, isBank: false, decimalPlaces: 2 },
  { symbol: "SOL", icon: sol, isBank: false, decimalPlaces: 4 },
  { symbol: "DAI", icon: dai, isBank: false, decimalPlaces: 2 },
  { symbol: "ADA", icon: ada, isBank: false, decimalPlaces: 2 },
];

export const banks: ICurrency[] = [
  { symbol: "Сбер", icon: sber, isBank: true, decimalPlaces: 0 },
  { symbol: "Т-Банк", icon: tbank, isBank: true, decimalPlaces: 0 },
  { symbol: "Альфа", icon: alfa, isBank: true, decimalPlaces: 0 },
  { symbol: "СБП", icon: sbp, isBank: true, decimalPlaces: 0 },
  { symbol: "ВТБ", icon: vtb, isBank: true, decimalPlaces: 0 },
  { symbol: "Райф", icon: raif, isBank: true, decimalPlaces: 0 },
  { symbol: "Газпром", icon: gaz, isBank: true, decimalPlaces: 0 },
  { symbol: "Росбанк", icon: ros, isBank: true, decimalPlaces: 0 },
  { symbol: "МТС", icon: mts, isBank: true, decimalPlaces: 0 },
  { symbol: "ОЗОН", icon: ozon, isBank: true, decimalPlaces: 0 },
  { symbol: "Уралсиб", icon: uralsib, isBank: true, decimalPlaces: 0 },
  { symbol: "Ак барс", icon: akbars, isBank: true, decimalPlaces: 0 },
  { symbol: "РСХБ", icon: rshb, isBank: true, decimalPlaces: 0 },
  { symbol: "Промсвязь", icon: psb, isBank: true, decimalPlaces: 0 },
  { symbol: "Альфа cash-in", icon: alfa, isBank: true, decimalPlaces: 0 },
  { symbol: "Ю мани", icon: you, isBank: true, decimalPlaces: 0 },
  { symbol: "PAYEER", icon: pay, isBank: true, decimalPlaces: 0 },
];

// Единый массив со всеми системами (монеты + банки)
export const allSystems: ICurrency[] = [
  // ===== Монеты =====
  { symbol: "BTC", icon: btc, isBank: false, decimalPlaces: 8 },
  { symbol: "ETH", icon: eth, isBank: false, decimalPlaces: 8 },
  { symbol: "USDT", icon: usdt, isBank: false, decimalPlaces: 2 },
  { symbol: "TON", icon: ton, isBank: false, decimalPlaces: 4 },
  { symbol: "XMR", icon: xmr, isBank: false, decimalPlaces: 4 },
  { symbol: "TRX", icon: trx, isBank: false, decimalPlaces: 2 },
  { symbol: "DOGE", icon: doge, isBank: false, decimalPlaces: 2 },
  { symbol: "USDC", icon: usdc, isBank: false, decimalPlaces: 2 },
  { symbol: "LTC", icon: ltc, isBank: false, decimalPlaces: 2 },
  { symbol: "SOL", icon: sol, isBank: false, decimalPlaces: 4 },
  { symbol: "DAI", icon: dai, isBank: false, decimalPlaces: 2 },
  { symbol: "ADA", icon: ada, isBank: false, decimalPlaces: 2 },

  // ===== Банки =====
  { symbol: "Сбер", icon: sber, isBank: true, decimalPlaces: 0 },
  { symbol: "Т-Банк", icon: tbank, isBank: true, decimalPlaces: 0 },
  { symbol: "Альфа", icon: alfa, isBank: true, decimalPlaces: 0 },
  { symbol: "СБП", icon: sbp, isBank: true, decimalPlaces: 0 },
  { symbol: "ВТБ", icon: vtb, isBank: true, decimalPlaces: 0 },
  { symbol: "Райф", icon: raif, isBank: true, decimalPlaces: 0 },
  { symbol: "Газпром", icon: gaz, isBank: true, decimalPlaces: 0 },
  { symbol: "Росбанк", icon: ros, isBank: true, decimalPlaces: 0 },
  { symbol: "МТС", icon: mts, isBank: true, decimalPlaces: 0 },
  { symbol: "ОЗОН", icon: ozon, isBank: true, decimalPlaces: 0 },
  { symbol: "Уралсиб", icon: uralsib, isBank: true, decimalPlaces: 0 },
  { symbol: "Ак барс", icon: akbars, isBank: true, decimalPlaces: 0 },
  { symbol: "РСХБ", icon: rshb, isBank: true, decimalPlaces: 0 },
  { symbol: "Промсвязь", icon: psb, isBank: true, decimalPlaces: 0 },
  { symbol: "Альфа cash-in", icon: alfa, isBank: true, decimalPlaces: 0 },
  { symbol: "Ю мани", icon: you, isBank: true, decimalPlaces: 0 },
  { symbol: "PAYEER", icon: pay, isBank: true, decimalPlaces: 0 },
];
