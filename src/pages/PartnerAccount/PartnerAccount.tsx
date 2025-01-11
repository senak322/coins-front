import React from "react";
import "./PartnerAccount.scss";
import AdvertisingMaterials from "../../components/AdvertisingMaterials/AdvertisingMaterials";

export default function PartnerAccount() {
  // Первая таблица (как у вас уже было)
  const accountId = 1337;
  const registrationDate = "09.11.2024";
  const email = "samplemail@mail.com";
  const partnerPercent = 0;

  // Вторая таблица — примерные данные
  const visitors = 1337;
  const referralCount = 42;
  const exchangesCount = 0;
  const totalExchangesSum = "0 USD";
  const ctrValue = "—"; // или можно вывести число в %
  const earnedAllTime = "—";
  const pendingPayout = "—";
  const totalPaid = "—";
  const currentBalance = "—";
  const availableForPayout = "—";

  const handleDownloadArchive = () => {
    // Логика скачивания архива
    alert("Загружаем архив...");
  };

  return (
    <div className="partner-account">
      <h2 className="partner-account__title">Партнёрский аккаунт</h2>

      <div style={{display: "flex", gap: "1rem"}}>
        {/* Первая таблица */}
        <div className="partner-account__table">
          <div className="stats-row">
            <div className="stats-label">ID</div>
            <div className="stats-value">{accountId}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Дата регистрации</div>
            <div className="stats-value">{registrationDate}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">E-mail</div>
            <div className="stats-value">{email}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Ваш парт. процент</div>
            <div className="stats-value">{partnerPercent} %</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Скачать архив операций</div>
            <div className="stats-value">
              <button
                onClick={handleDownloadArchive}
                className="download-button"
              >
                Загрузить
              </button>
            </div>
          </div>
        </div>

        {/* Вторая таблица */}
        <div className="partner-account__table partner-account__table--second">
          <div className="stats-row">
            <div className="stats-label">Посетителей</div>
            <div className="stats-value">{visitors}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Количество рефералов</div>
            <div className="stats-value">{referralCount}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Обменов</div>
            <div className="stats-value">{exchangesCount}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Сумма обменов</div>
            <div className="stats-value">{totalExchangesSum}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">CTR</div>
            <div className="stats-value">{ctrValue}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Заработано за все время</div>
            <div className="stats-value">{earnedAllTime}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Ожидают выплаты</div>
            <div className="stats-value">{pendingPayout}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Выплачено</div>
            <div className="stats-value">{totalPaid}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Текущий баланс</div>
            <div className="stats-value">{currentBalance}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Доступно для выплаты</div>
            <div className="stats-value">{availableForPayout}</div>
          </div>
        </div>
      </div>
      <AdvertisingMaterials />
    </div>
  );
}
