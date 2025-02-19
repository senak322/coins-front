import React, { useEffect, useState } from "react";
import { Textarea, Button, Group, Title, Loader, Alert } from "@mantine/core";
import "./AdminSettings.scss";

interface Tier {
  min: number;
  max: number;
  commission: number;
}

interface CommissionConfig {
  usdt: Tier[];
  btc: Tier[];
  alt: Tier[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettings() {
  const [config, setConfig] = useState<CommissionConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jsonInput, setJsonInput] = useState("");

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/admin/commissions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setConfig(data);
        setJsonInput(JSON.stringify(data, null, 2));
      } else {
        setError(data.error || "Ошибка получения конфигурации");
      }
    } catch (err) {
      setError("Ошибка загрузки конфигурации");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/admin/commissions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(parsed),
      });
      const data = await response.json();
      if (response.ok) {
        setConfig(data.config);
        alert("Конфигурация успешно обновлена");
      } else {
        alert(data.error || "Ошибка обновления конфигурации");
      }
    } catch (err) {
      alert("Неверный формат JSON");
    }
  };

  return (
    <div className="admin-settings">
      <Title order={3} mb="md">Настройки комиссий</Title>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      {config && (
        <>
          <Textarea
            label="Конфигурация комиссий (JSON)"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            autosize
            minRows={10}
          />
          <Group mt="md">
            <Button onClick={handleSave} variant="filled">
              Сохранить настройки
            </Button>
          </Group>
        </>
      )}
    </div>
  );
}
