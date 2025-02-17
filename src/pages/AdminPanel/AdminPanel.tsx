import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminPanel.scss";

export default function AdminPanel() {
    const adminNavItems = [
        { path: "orders", label: "Заявки" },
        { path: "settings", label: "Настройки" },
      ];

  return (
    <div className="admin-panel">
      <aside className="admin-panel__sidebar">
        <nav>
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "admin-panel__link active" : "admin-panel__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-panel__content">
        <Outlet /> {/* Здесь будут отрисовываться вложенные маршруты, например, список заявок */}
      </main>
    </div>
  );
}
