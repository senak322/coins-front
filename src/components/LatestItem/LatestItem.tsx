import CoinItem from "../CoinItem/CoinItem";
import change from "../../images/change.svg";
import "./LatestItem.scss";
import btc from "../../images/btc.png";
import eth from "../../images/eth.svg";
import usdt from "../../images/usdt.png";
import sber from "../../images/sber.svg";
import tbank from "../../images/t-bank.png";
import ton from "../../images/ton.png";
import xmr from "../../images/monero.png";
import trx from "../../images/trx.png";
import doge from "../../images/dogecoin.png";
import usdc from "../../images/usdc.png";
import ltc from "../../images/litecoin.png";
import sol from "../../images/solana.png";
import dai from "../../images/dai.png";
import ada from "../../images/cardano.png";
import alfa from "../../images/alfa.png";
import sbp from "../../images/sbp.svg";
import vtb from "../../images/VTB.png";
import raif from "../../images/raif.png";
import gaz from "../../images/gaz.png";
import ros from "../../images/ros.png";
import mts from "../../images/mts.png";
import ozon from "../../images/ozon.jpg";
import uralsib from "../../images/uralsib.svg";
import akbars from "../../images/akbars.svg";
import rshb from "../../images/rshb.png";
import psb from "../../images/psb.jpg";
import you from "../../images/you.png";
import pay from "../../images/pay.jpg";
import { IOrder } from "../../types/types";
import { format } from "date-fns";

// Функция для получения изображения валюты
const currencyImages: { [key: string]: string } = {
  BTC: btc,
  ETH: eth,
  USDT: usdt,
  Sber: sber,
  "T-Bank": tbank,
  // другие валюты по необходимости
};

function getImage(currencySymbol: string) {
  return currencyImages[currencySymbol] || "/images/default.png";
}

interface LatestItemProps {
  order: IOrder;
}

export default function LatestItem({ order }: LatestItemProps) {
  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyyy, HH:mm");
  };

  return (
    <div className="latest-item">
      <div className="latest-item__container">
        <CoinItem
          title={order.currencyGive || "Unknown Currency"}
          sum={order.amountGive || 0}
          image={getImage(order.currencyGive)}
        />
        <img className="latest-item__img" src={change} alt="change" />
        <CoinItem
          title={order.currencyReceive || "Unknown Currency"}
          sum={order.amountReceive || 0}
          image={getImage(order.currencyReceive)}
        />
      </div>
      <p className="latest-item__date">{formatDate(order.createdAt)}</p>
    </div>
  );
}
