import React, { useEffect, useState } from "react";
import { Select, Text, Loader, Group, ScrollArea } from "@mantine/core";
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
      const response = await fetch(`${baseURL}/api/order/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
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
      <h2>Заявки</h2>
      <div className="admin-orders__filter">
        <Text>Фильтр по статусу:</Text>
        <Select
          value={filterStatus}
          onChange={(value) => setFilterStatus(value as string)}
          data={[
            { value: "", label: "Все" },
            { value: "new", label: "Новые" },
            { value: "in_progress", label: "В работе" },
            { value: "completed", label: "Завершенные" },
            { value: "cancelled", label: "Отмененные" },
          ]}
          placeholder="Выберите статус"
          style={{ width: 200 }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text color="red">{error}</Text>
      ) : orders.length === 0 ? (
        <Text>Нет заявок для отображения</Text>
      ) : (
        <ScrollArea maw={"100vw"}>
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
                      onChange={(value) =>
                        handleStatusChange(order.orderId, value!)
                      }
                      data={[
                        { value: "new", label: "Новый" },
                        { value: "in_progress", label: "В работе" },
                        { value: "completed", label: "Завершен" },
                        { value: "cancelled", label: "Отменен" },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      )}
    </div>
  );
}
