import React, { useState } from "react";
import "./SecuritySettings.scss";
import QRCode from "qrcode.react";
import { Button, Dialog, TextInput } from "@mantine/core";

export default function SecuritySettings() {
  const baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] =
    useState(false);

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

  const handleEnable2FA = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${baseURL}/api/auth/2fa/generate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setQrCodeData(data.qrCode);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error generating 2FA:", error);
    }
  };

  const handleConfirm2FA = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${baseURL}/api/auth/2fa/enable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token: verificationCode }),
      });

      if (response.ok) {
        setIs2FAEnabled(true);
        setIsDialogOpen(false);
        alert("2FA enabled successfully!");
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
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
      <Dialog
        opened={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Setup Two-Factor Authentication"
      >
        {qrCodeData && (
          <>
            <QRCode
              value={qrCodeData}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
            <TextInput
              label="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              mt="md"
            />
            <Button onClick={handleConfirm2FA} fullWidth mt="md">
              Confirm
            </Button>
          </>
        )}
      </Dialog>

      {/* Уведомление по e-mail */}
      <div className="security-settings__section">
        <h2 className="security-settings__subtitle">
          Уведомления о входе в систему
        </h2>
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
