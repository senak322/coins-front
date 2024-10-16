import { useEffect, useState } from "react";
import LatestItem from "../LatestItem/LatestItem";
import "./Latest.scss";
import { IOrder } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Latest() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const [error, setError] = useState(""); // Добавляем состояние ошибки

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      latest: "Последние транзакции",
      error: "Транзакции не найдены"
    },
    en: {
      latest: "Latest transactions",
      error: "No recent transactions"
    },
  };

  const fetchLatestOrders = async () => {
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/order/latest`);
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
      <h3>{translations[currentLanguage].latest}</h3>
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
          <p>{translations[currentLanguage].error}</p>
        )}
      </div>
    </section>
  );
}
