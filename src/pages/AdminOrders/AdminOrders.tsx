import React, { useEffect, useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import "./AdminOrders.scss";

interface OrderData {
  orderId: string;
  user?: string;
  amountGive: number;
  currencyGive: string;
  amountReceive: number;
  currencyReceive: string;
  telegramNickname: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      let url = `${baseURL}/api/admin/orders`;
      if (filterStatus) {
        url += `?status=${filterStatus}`;
      }
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.orders) {
        setOrders(data.orders);
      } else {
        setError(data.error || "Ошибка получения данных");
      }
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        // Обновляем список заявок
        fetchOrders();
      } else {
        alert(data.message || "Ошибка обновления статуса");
      }
    } catch (err) {
      alert("Ошибка обновления статуса");
    }
  };

  return (
    <div className="admin-orders">
      <h2>Админ панель: Заявки</h2>
      <div className="filter">
        <label>Фильтр по статусу:</label>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as string)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="new">Новые</MenuItem>
          <MenuItem value="in_progress">В работе</MenuItem>
          <MenuItem value="completed">Завершенные</MenuItem>
          <MenuItem value="cancelled">Отмененные</MenuItem>
        </Select>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>Нет заявок для отображения</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Пользователь</th>
              <th>Отдаёте</th>
              <th>Получаете</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.telegramNickname}</td>
                <td>
                  {order.amountGive} {order.currencyGive}
                </td>
                <td>
                  {order.amountReceive} {order.currencyReceive}
                </td>
                <td>{order.status}</td>
                <td>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value as string)
                    }
                  >
                    <MenuItem value="new">Новый</MenuItem>
                    <MenuItem value="in_progress">В работе</MenuItem>
                    <MenuItem value="completed">Завершен</MenuItem>
                    <MenuItem value="cancelled">Отменен</MenuItem>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
