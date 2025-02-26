import React, { useState } from "react";
import "./AccountPage.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUser } from "../../store/userSlice";

export default function AccountPage() {
  const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

  const dispatch = useAppDispatch();

  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const [formData, setFormData] = useState({
    login: user?.login || "",
    lastName: user?.last_name || "",
    firstName: user?.first_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    telegram: user?.tg || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки данных на сервер
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token found");
      return 
    }

    try {
      // Отправляем PATCH-запрос на /api/auth/update
      const res = await fetch(`${baseURL}/api/auth/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          tg: formData.telegram,
          email: formData.email,
          // login менять не рекомендуем (либо делайте отдельную логику)
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Update failed:", errorData);
        alert("Ошибка при обновлении данных пользователя");
        return;
      }

      // Парсим ответ
      const data = await res.json();
      console.log("User updated:", data.user);

      dispatch(setUser(data.user));

      // Опционально уведомляем/перенаправляем
      alert("Данные успешно обновлены!");
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при отправке данных на сервер");
    }
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
            <label htmlFor="email" className="account-page__label">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
