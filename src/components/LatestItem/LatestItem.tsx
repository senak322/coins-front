import CoinItem from "../CoinItem/CoinItem";
import change from "../../images/change.svg";
import "./LatestItem.scss";
import eth from "../../images/eth.svg";
import sber from "../../images/sber.png";
import btc from "../../images/btc.png";
import usdt from "../../images/usdt.png";
import tbank from "../../images/t-bank.png";
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
