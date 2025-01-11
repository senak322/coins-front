import "./Referrals.scss";

interface Referral {
  user: string;
  registrationDate: string;
}

export default function Referrals() {
  // Примерные данные — замените их реальными из API или пропсов
  const data: Referral[] = [
    { user: "testuser@mail.com", registrationDate: "01.02.2024" },
    { user: "anotheruser@mail.com", registrationDate: "05.03.2024" },
  ];

  return (
    <div className="referrals">
      <h2 className="referrals__title">Рефералы</h2>

      <div className="referrals__table">
        <div className="table-header">
          <div className="header-cell">Пользователь</div>
          <div className="header-cell">Дата регистрации</div>
        </div>

        <div className="table-body">
          {data.length === 0 ? (
            <div className="table-row no-data">Нет данных для отображения</div>
          ) : (
            data.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="cell">{item.user}</div>
                <div className="cell">{item.registrationDate}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
