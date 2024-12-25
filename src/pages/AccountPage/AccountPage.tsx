import React, { useState } from "react";
import "./AccountPage.scss";

export default function AccountPage() {
  const [formData, setFormData] = useState({
    login: "",
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    telegram: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки данных на сервер
    console.log("Данные формы:", formData);
  };

  return (
    // <section>
      
      <div className="account-page">
        <h1 className="account-page__title">Личные данные</h1>
        <form className="account-page__form" onSubmit={handleSubmit}>
          <div className="account-page__field">
            <label htmlFor="login" className="account-page__label">
              Логин:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <div className="account-page__field">
            <label htmlFor="lastName" className="account-page__label">
              Фамилия:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <div className="account-page__field">
            <label htmlFor="firstName" className="account-page__label">
              Имя:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <div className="account-page__field">
            <label htmlFor="middleName" className="account-page__label">
              Отчество:
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <div className="account-page__field">
            <label htmlFor="phone" className="account-page__label">
              Номер моб. телефона:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <div className="account-page__field">
            <label htmlFor="telegram" className="account-page__label">
              Telegram:
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="account-page__input"
            />
          </div>
          <button type="submit" className="account-page__submit">
            Сохранить
          </button>
        </form>
      </div>
    // </section>
  );
}
