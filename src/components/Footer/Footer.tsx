import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__container">
      <Link to="/about" className="footer__li">About us</Link>
      <Link to="/rules" className="footer__li">Rules</Link>
      </ul>
      <p className="footer__rights">© All Rights Reserved. Coins Change. Info@atababa.ru</p>
    </footer>
  );
}
