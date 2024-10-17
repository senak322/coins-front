import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import telegram from "../../images/telegram.svg";
// import whats from "../../images/whats.svg";
import "./Contact.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Contact() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      contact: "Связаться с нами",
    },
    en: {
      contact: "Contact Us",
    },
  };
  return (
    <section className="contact">
      <h3>{translations[currentLanguage].contact}</h3>
      <div className="contact__container">
        <a href="https://t.me/Coins_change" target="_blank" rel="noreferrer">
          <img src={telegram} alt="telegram" />
        </a>
        <span className="contact__span"></span>
        <a className="contact__mail" href="mailto:coins_changebtc@proton.me">
          <AlternateEmailIcon className="" />
        </a>
      </div>
    </section>
  );
}
