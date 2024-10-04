import telegram from "../../images/telegram.svg";
// import whats from "../../images/whats.svg";
import "./Contact.scss";

export default function Contact() {
  return (
    <section className="contact">
      <h3>Contact Us</h3>
      <div className="contact__container">
        <a href="https://t.me/Coins_change" target="_blank" rel="noreferrer"><img src={telegram} alt="telegram" /></a>
        {/* <span className="contact__span"></span>
        <a href="https://t.me/senak322" target="_blank" rel="noreferrer"><img src={whats} alt="whats" /></a> */}
      </div>
    </section>
  );
}
