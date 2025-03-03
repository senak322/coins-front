import { NavLink, Outlet } from "react-router-dom";
import "./AccountLayout.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useWindowWidth from "../../hooks/useWindowWidth";
import { IconMenu2 } from '@tabler/icons-react';
import { useState } from "react";

export default function AccountLayout() {
  const user = useSelector((state: RootState) => state.user);
  const width = useWindowWidth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navItems = [
    { path: "/account/data", label: "Личные данные" },
    { path: "/account/security", label: "Настройки безопасности" },
    { path: "/account/accounts", label: "Ваши счета" },
    { path: "/account/operations", label: "Ваши операции" },
    { path: "/account/partners", label: "Партнёрский аккаунт" },
    { path: "/account/bonuses", label: "Партнёрские обмены" },
    { path: "/account/referrals", label: "Рефералы" },
    { path: "/account/withdraw", label: "Вывод партнёрских средств" },
  ];

  if (user && user.user && user.user.role_id === 2) {
    navItems.push({ path: "/admin/orders", label: "Админ панель" });
  }

  return (
    <main className="account-layout">
      <div className="account-layout__content">
        <Outlet /> {/* Контент текущего роута */}
      </div>
      {width < 768 && (
        <button className="burger-btn" onClick={toggleMenu}>
          <IconMenu2 />
        </button>
      )}
      <aside className={`account-layout__sidebar ${
          width < 768 ? "mobile" : ""
        } ${isMenuOpen ? "open" : "closed"}`}>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "account-layout__link active"
                  : "account-layout__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </main>
  );
}
