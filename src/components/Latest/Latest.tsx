import LatestItem from "../LatestItem/LatestItem";
import "./Latest.scss";

export default function Latest() {
  return (
    <section className="latest">
      <h3>Latest transactions</h3>
      <div className="latest__container">
        <LatestItem />
        <LatestItem />
        <LatestItem />
      </div>
    </section>
  );
}
