import React, { useEffect, useState } from "react";
import "./Referrals.scss";

interface Referral {
  login: string;
  email: string;
  registrationDate: string;
}

export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const baseURL =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "";
        const response = await fetch(`${baseURL}/api/partner/referrals`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.referrals) {
          const mapped: Referral[] = data.referrals.map((ref: any) => ({
            login: ref.login,
            email: ref.email,
            registrationDate: new Date(ref.createdAt).toLocaleDateString(),
          }));
          setReferrals(mapped);
        } else {
          setError(data.error || "Ошибка получения данных");
        }
      } catch (err) {
        setError("Ошибка получения данных");
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  return (
    <div className="referrals">
      <h2 className="referrals__title">Рефералы</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && referrals.length === 0 ? (
        <div className="table-row no-data">Нет данных для отображения</div>
      ) : (
        <div className="referrals__table">
          <div className="table-header">
            <div className="header-cell">Пользователь</div>
            <div className="header-cell">Дата регистрации</div>
          </div>
          <div className="table-body">
            {referrals.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="cell">{item.email || item.login}</div>
                <div className="cell">{item.registrationDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
