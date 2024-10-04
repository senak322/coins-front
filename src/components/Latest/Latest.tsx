import { useEffect, useState } from "react";
import LatestItem from "../LatestItem/LatestItem";
import "./Latest.scss";
import { IOrder } from "../../types/types";

export default function Latest() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const [error, setError] = useState(""); // Добавляем состояние ошибки

  const fetchLatestOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/latest");
      const data: { orders: IOrder[] } = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching latest orders:", error);
      setError("Failed to load latest transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestOrders();
  }, []);

  return (
    <section className="latest">
      <h3>Latest transactions</h3>
      <div className="latest__container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : orders.length > 0 ? (
          orders.map((order: IOrder) => (
            <LatestItem key={order.orderId} order={order} />
          ))
        ) : (
          <p>No recent transactions</p>
        )}
      </div>
    </section>
  );
}
