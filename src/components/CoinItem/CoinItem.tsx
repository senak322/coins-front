import "./CoinItem.scss";

interface CoinItemProps {
  title: string;
}

export default function CoinItem({ title }: CoinItemProps) {
  return (
    <div className="coin-item">
      <img src="" alt="" />
      <p>{title}</p>
      <p>8.012 ETH</p>
    </div>
  );
}
