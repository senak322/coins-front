import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <ul className="header__coins-list">
        <li>BTC ≈ 1 USD</li>
        <li>ETH ≈ 1 USD</li>
        <li>LTC ≈ 1 USD</li>
        <li>USDT ≈ 1 USD</li>
        <li>XMR ≈ 1 USD</li>
        <li>TON ≈ 1 USD</li>
      </ul>

      <div className="header__container">
        <h1 className="header__title">Coins Change</h1>
        <div className="header__links">
          <button className="header__link">Change</button>
          <button className="header__link">Investments</button>
        </div>
      </div>
    </header>
  );
}
