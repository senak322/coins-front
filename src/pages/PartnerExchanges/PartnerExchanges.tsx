import React from "react";
import "./PartnerExchanges.scss";

interface Exchange {
  id: number;
  date: string;
  user: string;
  reward: string;
}

export default function PartnerExchanges() {
  // Примерные данные. В реальном проекте вы можете получить их из API или props
  const data: Exchange[] = [
    { id: 101, date: "12.09.2024", user: "user@mail.com", reward: "2 USD" },
    { id: 102, date: "13.09.2024", user: "testuser@mail.com", reward: "1.5 USD" },
  ];

  return (
    <div className="partner-exchanges">
      <h2 className="partner-exchanges__title">Партнёрские обмены</h2>

      <div className="partner-exchanges__table">
        <div className="table-header">
          <div className="header-cell">ID обмена</div>
          <div className="header-cell">Дата</div>
          <div className="header-cell">Пользователь</div>
          <div className="header-cell">Вознаграждение</div>
        </div>

        <div className="table-body">
          {data.length === 0 ? (
            <div className="table-row no-data">Нет данных для отображения</div>
          ) : (
            data.map((item) => (
              <div className="table-row" key={item.id}>
                <div className="cell">{item.id}</div>
                <div className="cell">{item.date}</div>
                <div className="cell">{item.user}</div>
                <div className="cell">{item.reward}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
