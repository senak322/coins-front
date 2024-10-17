import { Link } from "react-router-dom";
import "./Footer.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Footer() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      about: "О нас",
      rules: "Правила",
    },
    en: {
      about: "About us",
      rules: "Rules",
    },
  };
  return (
    <footer className="footer">
      <ul className="footer__container">
        <Link to="/about" className="footer__li">
          {translations[currentLanguage].about}
        </Link>
        <Link to="/rules" className="footer__li">
          {translations[currentLanguage].rules}
        </Link>
      </ul>
      <p className="footer__rights">
        © All Rights Reserved. Coins Change. coins_changebtc@proton.me
      </p>
    </footer>
  );
}
