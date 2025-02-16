import { useEffect, useState } from "react";
import "./UserOperations.scss";

interface OrderData {
  orderId: string;
  amountGive: number;
  currencyGive: string;
  amountReceive: number;
  currencyReceive: string;
  telegramNickname: string;
  networkGive?: string;
  status: "new" | "completed" | "in_progress" | "cancelled";
  accountId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserOperations() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Здесь можно использовать endpoint "/api/order/all" или "/api/order/my" в зависимости от задачи
      const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/order/my`, {
        headers: {
          "Content-Type": "application/json",
          // Если требуется, добавьте JWT в заголовке:
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.orders) {
        setOrders(data.orders);
      } else {
        console.error("Ошибка получения заказов:", data.message);
      }
    } catch (error) {
      console.error("Ошибка загрузки заявок:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Пример расчёта статистики:
  const totalExchanges = orders.length;
  // Здесь для примера суммируем amountGive, предположим, что они в USD или уже сконвертированы
  const totalAmount = orders.reduce((sum, order) => sum + order.amountGive, 0);

  return (
    <div className="operations-container">
      <h2 className="operations-title">Ваши операции</h2>

      {/* Блок со статистикой */}
      <div className="operations-stats">
        <div className="stats-row">
          <div className="stats-label">Обменов</div>
          <div className="stats-value">{totalExchanges}</div>
        </div>
        {/* <div className="stats-row">
          <div className="stats-label">Сумма обменов</div>
          <div className="stats-value">{totalAmount} USD</div>
        </div> */}
        <div className="stats-row">
          <div className="stats-label">Скачать архив операций</div>
          <div className="stats-value stats-download">
            {/* Здесь можно реализовать скачивание архива */}
            <button className="download-button">Скачать</button>
          </div>
        </div>
      </div>

      {/* Таблица сделок */}
      <div className="operations-table">
        {isLoading ? (
          <p>Загрузка...</p>
        ) : orders.length === 0 ? (
          <p className="no-data">Данных нет</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Отдаёте</th>
                <th>Получаете</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    {order.amountGive} {order.currencyGive}
                  </td>
                  <td>
                    {order.amountReceive} {order.currencyReceive}
                  </td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
