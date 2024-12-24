import { NavLink, Outlet } from "react-router-dom";
import "./AccountLayout.scss";

export default function AccountLayout() {
  const navItems = [
    { path: "/account", label: "Личный кабинет" },
    { path: "/account/security", label: "Настройки безопасности" },
    { path: "/account/accounts", label: "Ваши счета" },
    { path: "/account/operations", label: "Ваши операции" },
    { path: "/account/partner-account", label: "Партнёрский аккаунт" },
    { path: "/account/partner-exchanges", label: "Партнёрские обмены" },
    { path: "/account/referrals", label: "Рефералы" },
    { path: "/account/partner-withdrawals", label: "Вывод партнёрских средств" },
  ];

  return (
    <div className="account-layout">
      <aside className="account-layout__sidebar">
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "account-layout__link active" : "account-layout__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="account-layout__content">
        <Outlet /> {/* Контент текущего роута */}
      </main>
    </div>
  );
}
