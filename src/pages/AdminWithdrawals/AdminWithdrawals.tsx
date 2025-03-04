import React, { useEffect, useState } from "react";
import {
  Table,
  Title,
  Loader,
  Alert,
  Select,
  MenuItem,
  Group,
  ScrollArea,
} from "@mantine/core";
import "./AdminWithdrawals.scss";

interface Withdrawal {
  withdrawalId: string;
  amount: number;
  contact: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/withdrawals/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.withdrawals) {
        setWithdrawals(data.withdrawals);
      } else {
        setError(data.error || "Ошибка получения данных");
      }
    } catch (err) {
      setError("Ошибка загрузки заявок");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleStatusChange = async (
    withdrawalId: string,
    newStatus: string
  ) => {
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(
        `${baseURL}/api/withdrawals/${withdrawalId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchWithdrawals();
      } else {
        alert(data.message || "Ошибка обновления статуса");
      }
    } catch (err) {
      alert("Ошибка обновления статуса");
    }
  };

  return (
    <div className="admin-withdrawals">
      <Title order={4} mb="md">
        Заявки на вывод средств
      </Title>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      {!loading && !error && withdrawals.length === 0 && (
        <p>Нет заявок для отображения</p>
      )}
      {!loading && !error && withdrawals.length > 0 && (
        <ScrollArea maw={"100vw"}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Номер заявки</Table.Th>
                <Table.Th>Дата</Table.Th>
                <Table.Th>Сумма (RUB)</Table.Th>
                <Table.Th>Контакт</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {withdrawals.map((item) => (
                <Table.Tr key={item.withdrawalId}>
                  <Table.Td>{item.withdrawalId}</Table.Td>
                  <Table.Td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>{item.amount}</Table.Td>
                  <Table.Td>{item.contact}</Table.Td>
                  <Table.Td>{item.status}</Table.Td>
                  <Table.Td>
                    <Select
                      value={item.status}
                      onChange={(value) =>
                        handleStatusChange(item.withdrawalId, value!)
                      }
                      data={[
                        { value: "new", label: "Новый" },
                        { value: "in_progress", label: "В работе" },
                        { value: "completed", label: "Завершён" },
                        { value: "cancelled", label: "Отменён" },
                      ]}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
}
