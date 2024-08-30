import Contact from "../Contact/Contact";
import Cooperate from "../Cooperate/Cooperate";
import ExchangeWidget from "../ExchangeWidget/ExchangeWidget";

import Latest from "../Latest/Latest";
import Qa from "../Qa/Qa";
import "./MainExchange.scss";

export default function MainExchange() {
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">
          A new and easy way to change your coins!
        </h2>
        <p>Our project helps with buy, sell and change cryptocurrency</p>
      </div>
      <ExchangeWidget />
      <Qa />
      <Contact />
      <Latest />
      <Cooperate />
    </main>
  );
}
