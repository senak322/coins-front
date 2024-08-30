import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__container">
        <li className="footer__li">About</li>
        <li className="footer__li">Features</li>
        <li className="footer__li">Change</li>
        <li className="footer__li">Investments</li>
        <li className="footer__li">Help</li>
        <li className="footer__li">Contacts</li>
      </ul>
      <p className="footer__rights">© All Rights Reserved. Coins Change. contact@coinschange.com</p>
    </footer>
  );
}
