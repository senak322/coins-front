import React, { useEffect, useState } from "react";
import "./PartnerExchanges.scss";
import { ScrollArea, Table } from "@mantine/core";

interface Exchange {
  id: string;
  date: string;
  user: string;
  reward: string;
}

export default function PartnerExchanges() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExchanges = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/partner/exchanges`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.exchanges) {
        // Преобразуем дату в читаемый формат
        const mapped: Exchange[] = data.exchanges.map((item: any) => ({
          id: item.id,
          date: new Date(item.date).toLocaleDateString(),
          user: item.user,
          reward: item.reward,
        }));
        setExchanges(mapped);
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
    fetchExchanges();
  }, []);

  return (
    <div className="partner-exchanges">
      <h2 className="partner-exchanges__title">Партнёрские обмены</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && exchanges.length === 0 ? (
        <div className="table-row no-data">Нет данных для отображения</div>
      ) : (
        <ScrollArea>
          <Table striped className="partner-exchanges__table">
            <Table.Thead className="table-header">
              <Table.Tr>
                <Table.Th className="header-cell">ID обмена</Table.Th>
                <Table.Th className="header-cell">Дата</Table.Th>
                <Table.Th className="header-cell">Пользователь</Table.Th>
                <Table.Th className="header-cell">Вознаграждение</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="table-body">
              {exchanges.map((item) => (
                <Table.Tr className="table-row" key={item.id}>
                  <Table.Td className="cell">{item.id}</Table.Td>
                  <Table.Td className="cell">{item.date}</Table.Td>
                  <Table.Td className="cell">{item.user}</Table.Td>
                  <Table.Td className="cell">{item.reward}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
}
