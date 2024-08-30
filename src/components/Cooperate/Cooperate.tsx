import "./Cooperate.scss";
import best from "../../images/best.png";
import bist from "../../images/bits.png";
import trust from "../../images/trustpilot.png";

export default function Cooperate() {
  return (
    <section className="cooperate">
      <h3 className="cooperate__title">We cooperate with leading services</h3>
      <div className="cooperate__container">
        <img className="cooperate__img" src={best} alt="best change" />
        <span className="cooperate__span"></span>
        <img className="cooperate__img" src={bist} alt="bist media" />
        <span className="cooperate__span"></span>
        <img className="cooperate__img" src={trust} alt="trustpilot" />
      </div>
    </section>
  );
}
