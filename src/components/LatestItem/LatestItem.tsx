import CoinItem from "../CoinItem/CoinItem";
import change from "../../images/change.svg";
import "./LatestItem.scss";

export default function LatestItem() {
  return (
    <div className="latest-item">
      <div className="latest-item__container">
        <CoinItem title="ETH" sum={8.012} />
        <img src={change} alt="change" />
        <CoinItem title="Sber" sum={240000} />
      </div>
      <p className="latest-item__date">24.06.2024, 04:16</p>
    </div>
  );
}
