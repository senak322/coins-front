import "./UserOperations.scss";

interface Deal {
  id: number;
  date: string;
  rate: string;
  give: string;
  receive: string;
  status: string;
}

export default function UserOperations() {
  // Здесь вы можете загрузить реальную статистику и список сделок из API
  const totalExchanges = 0;
  const totalAmount = 0;
  const deals: Deal[] = []; // Пусть пока пустой список

  return (
    <div className="operations-container">
      <h2 className="operations-title">Ваши операции</h2>

      {/* Блок со статистикой */}
      <div className="operations-stats">
        <div className="stats-row">
          <div className="stats-label">Обменов</div>
          <div className="stats-value">{totalExchanges}</div>
        </div>
        <div className="stats-row">
          <div className="stats-label">Сумма обменов</div>
          <div className="stats-value">{totalAmount} USD</div>
        </div>
        <div className="stats-row">
          <div className="stats-label">Скачать архив операций</div>
          <div className="stats-value stats-download">
            {/* В реальном проекте логика скачивания/экспорта будет своя */}
            <button className="download-button">Скачать</button>
          </div>
        </div>
      </div>

      {/* Таблица сделок */}
      <div className="operations-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              {/* <th>Курс</th> */}
              <th>Отдаёте</th>
              <th>Получаете</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {deals.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-data">
                  Данных нет
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr key={deal.id}>
                  <td>{deal.id}</td>
                  <td>{deal.date}</td>
                  {/* <td>{deal.rate}</td> */}
                  <td>{deal.give}</td>
                  <td>{deal.receive}</td>
                  <td>{deal.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
