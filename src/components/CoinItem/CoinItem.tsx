import "./CoinItem.scss";

interface CoinItemProps {
  title: string;
  sum: number;
}

export default function CoinItem({ title, sum }: CoinItemProps) {
  return (
    <div className="coin-item">
      <img src="" alt="" />
      <p>{title}</p>
      <p>{sum}</p>
      <p>{title}</p>
    </div>
  );
}
