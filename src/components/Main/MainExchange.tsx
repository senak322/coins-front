import Contact from "../Contact/Contact";
import Cooperate from "../Cooperate/Cooperate";
import ExchangeWidget from "../ExchangeWidget/ExchangeWidget";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Latest from "../Latest/Latest";
import Qa from "../Qa/Qa";
import "./MainExchange.scss";

export default function MainExchange() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      title: "Новый и простой способ обмена криптовалюты!",
      subtitle:
        "Наш проект помогает покупать, продавать и обменивать криптовалюту",
    },
    en: {
      title: "A new and easy way to change your coins!",
      subtitle: "Our project helps with buy, sell and change cryptocurrency",
    },
  };

  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">{translations[currentLanguage].title}</h2>
        <p className="main__title">{translations[currentLanguage].subtitle}</p>
      </div>
      <ExchangeWidget />
      <Qa />
      <Contact />
      <Latest />
      <Cooperate />
    </main>
  );
}
