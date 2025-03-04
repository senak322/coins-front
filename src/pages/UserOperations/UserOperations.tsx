import React, { useEffect, useState } from "react";
import "./UserOperations.scss";
import { ScrollArea } from "@mantine/core";

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
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/order/my`, {
        headers: {
          "Content-Type": "application/json",
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

  // Функция для экспорта данных в CSV
  const exportToCSV = () => {
    // Определяем заголовок CSV
    const header = [
      "ID",
      "Дата",
      "Время",
      "Отдаёте",
      "Получаете",
      "Статус",
      "Телеграм",
      "Сеть",
    ];
    // Преобразуем данные заказов в массив строк
    const rows = orders.map((order) => [
      order.orderId,
      `${new Date(order.createdAt).toLocaleString()}`,
      `${order.amountGive} ${order.currencyGive}`,
      `${order.amountReceive} ${order.currencyReceive}`,
      order.status,
      order.telegramNickname,
      order.networkGive || "",
    ]);

    // Объединяем заголовок и строки в один CSV‑контент
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    // Создаем Blob и инициируем скачивание
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders_archive.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Пример расчёта статистики:
  const totalExchanges = orders.length;
  // const totalAmount = orders.reduce((sum, order) => sum + order.amountGive, 0);

  return (
    <div className="operations-container">
      <h2 className="operations-title">Ваши операции</h2>
      <div className="operations-stats">
        <div className="stats-row">
          <div className="stats-label">Обменов</div>
          <div className="stats-value">{totalExchanges}</div>
        </div>
        <div className="stats-row">
          <div className="stats-label">Скачать архив операций</div>
          <div className="stats-value stats-download">
            <button className="download-button" onClick={exportToCSV}>
              Скачать
            </button>
          </div>
        </div>
      </div>
      <div className="operations-table">
        {isLoading ? (
          <p>Загрузка...</p>
        ) : orders.length === 0 ? (
          <p className="no-data">Данных нет</p>
        ) : (
         < ScrollArea>
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
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
