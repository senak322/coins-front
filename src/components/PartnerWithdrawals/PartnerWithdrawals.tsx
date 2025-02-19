import React, { useEffect, useState } from "react";
import { Table, Title, Loader, Alert } from "@mantine/core";
import "./PartnerWithdrawals.scss";

interface Withdrawal {
  withdrawalId: string;
  amount: number;
  contact: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export default function PartnerWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/withdrawals/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.withdrawals) {
        setWithdrawals(data.withdrawals);
      } else {
        setError(data.error || "Ошибка получения заявок");
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

  return (
    <div className="partner-withdrawals">
      <Title order={4} mb="md">
        Заявки на вывод средств
      </Title>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      {!loading && !error && withdrawals.length === 0 && (
        <p>Нет заявок на вывод средств</p>
      )}
      {!loading && !error && withdrawals.length > 0 && (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Номер заявки</Table.Th>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Сумма (RUB)</Table.Th>
              <Table.Th>Контакт</Table.Th>
              <Table.Th>Статус</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {withdrawals.map((item) => (
              <Table.Tr key={item.withdrawalId}>
                <Table.Td>{item.withdrawalId}</Table.Td>
                <Table.Td>{new Date(item.createdAt).toLocaleDateString()}</Table.Td>
                <Table.Td>{item.amount}</Table.Td>
                <Table.Td>{item.contact}</Table.Td>
                <Table.Td>{item.status}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </div>
  );
}
