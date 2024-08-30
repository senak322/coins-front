import "./CoinItem.scss";

interface CoinItemProps {
  title: string;
  sum: number;
  image: string;
}

export default function CoinItem({ title, sum, image }: CoinItemProps) {
  return (
    <div className="coin-item">
      <div className="coin-item__container">
        <img src={image} className="coin-item__image" alt={title} />
        <p className="coin-item__title">{title}</p>
      </div>
      <div className="coin-item__container">
        <p className="coin-item__text">{sum}</p>
        <p className="coin-item__text">{title}</p>
      </div>
    </div>
  );
}
