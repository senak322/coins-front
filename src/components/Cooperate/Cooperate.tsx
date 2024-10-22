import "./Cooperate.scss";
import best from "../../images/best.png";
import bist from "../../images/bits.png";
// import trust from "../../images/trustpilot.png";
import bestex from "../../images/bestex.gif";
import kurs from "../../images/kurs.jpeg";
import okchanger from "../../images/okchanger.jpg";
import sumo from "../../images/sumo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Cooperate() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      service: "Мы сотрудничаем с ведущими сервисами",
    },
    en: {
      service: "We cooperate with leading services",
    },
  };
  return (
    <section className="cooperate">
      <h3 className="cooperate__title">{translations[currentLanguage].service}</h3>
      <div className="cooperate__container">
        <a href="https://www.bestchange.ru/" target="_blank" rel="noreferrer">
          <img className="cooperate__img" src={best} alt="best change" />
        </a>
        {/* <span className="cooperate__span"></span> */}
        <a href="https://bits.media/" target="_blank" rel="noreferrer">
          <img className="cooperate__img" src={bist} alt="bits media" />
        </a>
        {/* <span className="cooperate__span"></span> */}
        {/* <img className="cooperate__img" src={trust} alt="trustpilot" /> */}
        <a href="https://bestexchangers.ru/" target="_blank" rel="noreferrer">
          <img
            className="cooperate__img"
            src={bestex}
            alt="bestexchangers.ru"
          />
        </a>
        {/* <span className="cooperate__span"></span> */}
        <a href="https://kurs.expert/" target="_blank" rel="noreferrer">
          <img className="cooperate__img" src={kurs} alt="Курс Эксперт" />
        </a>
        {/* <span className="cooperate__span"></span> */}
        <a href="https://www.okchanger.ru/" target="_blank" rel="noreferrer">
          <img className="cooperate__img" src={okchanger} alt="okchanger" />
        </a>
        {/* <span className="cooperate__span"></span> */}
        <a href="https://exchangesumo.com/" target="_blank" rel="noreferrer">
          <img className="cooperate__img" src={sumo} alt="exchange sumo" />
        </a>
      </div>
    </section>
  );
}
