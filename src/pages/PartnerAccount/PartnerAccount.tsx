import React, { useEffect, useState } from "react";
import "./PartnerAccount.scss";
import AdvertisingMaterials from "../../components/AdvertisingMaterials/AdvertisingMaterials";
import PartnerWithdrawals from "../../components/PartnerWithdrawals/PartnerWithdrawals";

interface PartnerInfo {
  accountId: string;
  registrationDate: string;
  email: string;
  partnerPercent: number;
  referralCount: number;
  visitors: number;
  exchangesCount: number;
  totalExchangesSum: number;
  ctrValue: string;
  earnedAllTime: number;
  pendingPayout: number;
  totalPaid: number;
  currentBalance: number;
  availableForPayout: number;
}

export default function PartnerAccount() {
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPartnerInfo = async () => {
    setLoading(true);
    try {
      const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/partner/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPartnerInfo(data);
      } else {
        setError(data.error || "Ошибка получения данных");
      }
    } catch (err) {
      setError("Ошибка получения данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerInfo();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!partnerInfo) {
    return <p>Нет данных</p>;
  }

  return (
    <div className="partner-account">
      <h2 className="partner-account__title">Партнёрский аккаунт</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {/* Первая таблица */}
        <div className="partner-account__table">
          <div className="stats-row">
            <div className="stats-label">ID</div>
            <div className="stats-value">{partnerInfo.accountId}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Дата регистрации</div>
            <div className="stats-value">{new Date(partnerInfo.registrationDate).toLocaleDateString()}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">E-mail</div>
            <div className="stats-value">{partnerInfo.email}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Ваш парт. процент</div>
            <div className="stats-value">{partnerInfo.partnerPercent} %</div>
          </div>
        </div>
        {/* Вторая таблица */}
        <div className="partner-account__table partner-account__table--second">
          <div className="stats-row">
            <div className="stats-label">Количество рефералов</div>
            <div className="stats-value">{partnerInfo.referralCount}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Обменов</div>
            <div className="stats-value">{partnerInfo.exchangesCount}</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Сумма обменов (RUB)</div>
            <div className="stats-value">{partnerInfo.totalExchangesSum.toFixed(2)} RUB</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Заработано за все время (RUB)</div>
            <div className="stats-value">{partnerInfo.earnedAllTime.toFixed(2)} RUB</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Ожидают выплаты (RUB)</div>
            <div className="stats-value">{partnerInfo.pendingPayout.toFixed(2)} RUB</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Выплачено (RUB)</div>
            <div className="stats-value">{partnerInfo.totalPaid.toFixed(2)} RUB</div>
          </div>
          <div className="stats-row">
            <div className="stats-label">Текущий баланс (RUB)</div>
            <div className="stats-value">{partnerInfo.currentBalance.toFixed(2)} RUB</div>
          </div>
          {/* <div className="stats-row">
            <div className="stats-label">Доступно для выплаты (RUB)</div>
            <div className="stats-value">{partnerInfo.availableForPayout.toFixed(2)} RUB</div>
          </div> */}
        </div>
      </div>
      <div className="partner-account__withdrawals">
        <PartnerWithdrawals />
      </div>
      <AdvertisingMaterials  referralCode={partnerInfo.accountId} />
    </div>
  );
}
