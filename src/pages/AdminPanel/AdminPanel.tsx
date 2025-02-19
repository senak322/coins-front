import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Paper, Title } from "@mantine/core";
import "./AdminPanel.scss";

export default function AdminPanel() {
  const adminNavItems = [
    { path: "orders", label: "Заявки" },
    { path: "settings", label: "Настройки" },
  ];

  return (
    <Paper className="admin-panel" shadow="md" radius="md" p="xl">
      <main className="admin-panel__content">
        <Title order={3} mb="md">Админ панель</Title>
        <Outlet />
      </main>
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
      
    </Paper>
  );
}
