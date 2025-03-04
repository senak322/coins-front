import React, { useState } from "react";
import "./SecuritySettings.scss";
import { Button, Dialog, Modal, TextInput } from "@mantine/core";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setIs2FAEnabled, setEmailNotificationsEnabled } from "../../store/userSlice";

export default function SecuritySettings() {
  const baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  
    const dispatch = useAppDispatch();

    const { user } = useSelector(
      (state: RootState) => state.user
    );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Пароли не совпадают.");
      return;
    }

    // Берём токен из localStorage (или Redux)
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Нет токена – нужно войти заново");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/auth/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: passwordData.newPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error changing password:", errorData);
        alert(errorData.error || "Произошла ошибка при смене пароля");
        return;
      }

      const data = await res.json();
      console.log("Password updated:", data);
      alert("Пароль успешно изменён!");
      // Доп. логика: сбросить поля, диспатчить что-то в Redux и т.п.
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Request failed:", err);
      alert("Ошибка при запросе к серверу");
    }
  };

  // Запрос на генерацию секрета и QR-кода для включения 2FA
  const handleEnable2FA = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(`${baseURL}/api/auth/2fa/generate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const data = await response.json();
      if (data.qrCode) {
        setQrCodeData(data.qrCode);
        setIsDialogOpen(true);
      } else {
        alert("Ошибка при генерации QR-кода");
      }
    } catch (error) {
      console.error("Error generating 2FA:", error);
    }
  };

  // Подтверждение включения 2FA с введённым кодом
  const handleConfirm2FA = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(`${baseURL}/api/auth/2fa/enable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ token: verificationCode }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setIs2FAEnabled(true));
        setIsDialogOpen(false);
        alert("Двухфакторная аутентификация успешно включена!");
      } else {
        alert(data.error || "Ошибка активации 2FA");
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
  };

  // Отключение 2FA
  const handleDisable2FA = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch(`${baseURL}/api/auth/2fa/disable`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setIs2FAEnabled(false));
        alert("Двухфакторная аутентификация успешно отключена!");
      } else {
        alert(data.error || "Ошибка отключения 2FA");
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
    }
  };

  const handleEmailNotificationToggle = async () => {
    try {
      const newValue = !user?.emailNotificationsEnabled;
      
      // Отправляем запрос на сервер для обновления настроек уведомлений
      const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/users/notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ emailNotificationsEnabled: newValue }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setEmailNotificationsEnabled(newValue));
        console.log("Уведомления обновлены:", data.emailNotificationsEnabled);
      } else {
        alert(data.error || "Ошибка обновления настроек уведомлений");
      }
    } catch (error) {
      console.error("Error updating email notification settings:", error);
      alert("Ошибка обновления настроек уведомлений");
    }
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
          <label htmlFor="confirmPassword" className="security-settings__label">
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
        <button
          type="submit"
          className="security-settings__submit"
          disabled={
            passwordData.newPassword.trim() === "" ||
            passwordData.confirmPassword.trim() === ""
          }
        >
          Сохранить
        </button>
      </form>
      {/* Двухфакторная аутентификация */}
      <div className="security-settings__section">
        <h2 className="security-settings__subtitle">
          Двухфакторная аутентификация
        </h2>
        <button
          className={`security-settings__button ${
            user?.twoFA ? "disable" : "enable"
          }`}
          onClick={user?.twoFA  ? handleDisable2FA : handleEnable2FA}
        >
          {user?.twoFA 
            ? "Отключить двухфакторную аутентификацию"
            : "Подключить двухфакторную аутентификацию"}
        </button>
      </div>

      {/* Двухфакторная аутентификация */}
      <Modal
        centered
        opened={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Настройка двухфакторной аутентификации"
      >
        {qrCodeData && (
          <>
            
            <img src={qrCodeData} alt="QR code" width="200" height="200" />
            <TextInput
              label="Введите код из приложения"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              mt="md"
            />
            <Button onClick={handleConfirm2FA} fullWidth mt="md">
              Подтвердить
            </Button>
          </>
        )}
      </Modal>

      {/* Уведомление по e-mail */}
      <div className="security-settings__section">
        <h2 className="security-settings__subtitle">
          Уведомления о заявках
        </h2>
        <button
          className={`security-settings__button ${
            user?.emailNotificationsEnabled ? "disable" : "enable"
          }`}
          onClick={handleEmailNotificationToggle}
        >
          {user?.emailNotificationsEnabled === true 
            ? "Отключить уведомления по e-mail"
            : "Подключить уведомления по e-mail"}
        </button>
      </div>
    </div>
  );
}
