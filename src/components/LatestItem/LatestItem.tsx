import CoinItem from "../CoinItem/CoinItem";
import change from "../../images/change.svg";
import "./LatestItem.scss";
import eth from "../../images/eth.svg"
import sber from "../../images/sber.png"

export default function LatestItem() {
  return (
    <div className="latest-item">
      <div className="latest-item__container">
        <CoinItem title="ETH" sum={8.012} image={eth}/>
        <img src={change} alt="change" />
        <CoinItem title="Sber" sum={240000} image={sber}/>
      </div>
      <p className="latest-item__date">24.06.2024, 04:16</p>
    </div>
  );
}
