import Exchanger from "../Exchanger/Exchanger";
import "./MainExchange.scss";

export default function MainExchange() {
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">A new and easy way to change your coins!</h2>
        <p>Our project helps with buy, sell and change cryptocurrency</p>
      </div>
      <Exchanger />
    </main>
  );
}
