import React, { useEffect, useState } from "react";
import "./PartnerExchanges.scss";

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
        <div className="partner-exchanges__table">
          <div className="table-header">
            <div className="header-cell">ID обмена</div>
            <div className="header-cell">Дата</div>
            <div className="header-cell">Пользователь</div>
            <div className="header-cell">Вознаграждение</div>
          </div>
          <div className="table-body">
            {exchanges.map((item) => (
              <div className="table-row" key={item.id}>
                <div className="cell">{item.id}</div>
                <div className="cell">{item.date}</div>
                <div className="cell">{item.user}</div>
                <div className="cell">{item.reward}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
