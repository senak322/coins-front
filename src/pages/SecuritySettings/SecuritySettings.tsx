import React, { useState } from "react";
import "./SecuritySettings.scss";

export default function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] =
    useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Пароли не совпадают.");
      return;
    }
    // Логика отправки нового пароля на сервер
    console.log("Изменение пароля:", passwordData.newPassword);
  };

  const handle2FAToggle = () => {
    if (is2FAEnabled) {
      // Логика отключения 2FA
      console.log("Отключение двухфакторной аутентификации");
    } else {
      // Логика подключения 2FA
      console.log("Подключение двухфакторной аутентификации");
    }
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleEmailNotificationToggle = () => {
    if (isEmailNotificationEnabled) {
      console.log("Отключение уведомлений по e-mail");
    } else {
      console.log("Подключение уведомлений по e-mail");
    }
    setIsEmailNotificationEnabled(!isEmailNotificationEnabled);
  };

  return (
    <div className="security-settings">
      <h1 className="security-settings__title">Настройки безопасности</h1>

      {/* Форма изменения пароля */}
      <form className="security-settings__form" onSubmit={handlePasswordSubmit}>
        <div className="security-settings__field">
          <label htmlFor="newPassword" className="security-settings__label">
            Новый пароль:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="security-settings__input"
          />
        </div>
        <div className="security-settings__field">
          <label
            htmlFor="confirmPassword"
            className="security-settings__label"
          >
            Новый пароль повторно:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="security-settings__input"
          />
        </div>
        <button type="submit" className="security-settings__submit">
          Сохранить
        </button>
      </form>

      {/* Двухфакторная аутентификация */}
      <div className="security-settings__section">
        <h2 className="security-settings__subtitle">Двухфакторная аутентификация</h2>
        <button
          className={`security-settings__button ${
            is2FAEnabled ? "disable" : "enable"
          }`}
          onClick={handle2FAToggle}
        >
          {is2FAEnabled
            ? "Отключить двухфакторную аутентификацию"
            : "Подключить двухфакторную аутентификацию"}
        </button>
      </div>

      {/* Уведомление по e-mail */}
      <div className="security-settings__section">
        <h2 className="security-settings__subtitle">Уведомления о входе в систему</h2>
        <button
          className={`security-settings__button ${
            isEmailNotificationEnabled ? "disable" : "enable"
          }`}
          onClick={handleEmailNotificationToggle}
        >
          {isEmailNotificationEnabled
            ? "Отключить уведомления по e-mail"
            : "Подключить уведомления по e-mail"}
        </button>
      </div>
    </div>
  );
}
