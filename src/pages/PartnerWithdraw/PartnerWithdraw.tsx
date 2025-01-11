import React, { useState } from "react";
import "./PartnerWithdraw.scss";

export default function PartnerWithdraw() {
  // Пример: Вы можете хранить выбранный кошелёк и сумму в state
  const [wallet, setWallet] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    // Логика заказа вывода средств
    // Например, проверка суммы, отправка запроса и т.д.
    alert(`Запрос на вывод партнёрских средств.\nКошелёк: ${wallet}\nСумма: ${amount}`);
  };

  return (
    <div className="partner-withdraw">
      <h2 className="partner-withdraw__title">Вывод партнёрских средств</h2>
      <p className="partner-withdraw__info">
        Минимальная сумма вывода 10 USD. Все оплаты производятся после
        проверки администратором учетной записи. Как правило, это занимает не
        более 24&nbsp;часов с&nbsp;момента подачи заявки на&nbsp;снятие средств
      </p>

      <div className="partner-withdraw__box">
        <div className="partner-withdraw__field">
          <label className="partner-withdraw__label">Кошелек:</label>
          <select
            className="partner-withdraw__select"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          >
            <option value="">--Нет значения ---</option>
            <option value="qiwi">Qiwi</option>
            <option value="yoomoney">ЮMoney</option>
            <option value="payeer">Payeer</option>
            {/* …и т.д. По необходимости добавьте другие варианты */}
          </select>
        </div>

        <div className="partner-withdraw__field">
          <input
            type="text"
            className="partner-withdraw__input"
            placeholder="Введите сумму (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="partner-withdraw__button"
          onClick={handleSubmit}
        >
          Заказать
        </button>
      </div>
    </div>
  );
}
