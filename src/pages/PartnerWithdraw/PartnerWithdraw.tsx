import React, { useEffect, useState } from "react";
import { TextInput, Button, Alert, Group, Title, Loader, Flex } from "@mantine/core";
import "./PartnerWithdraw.scss";

interface PartnerInfo {
  currentBalance: number; // доступно для вывода, в рублях
}

export default function PartnerWithdraw() {
  const [amount, setAmount] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Получаем данные партнёра, чтобы знать доступный баланс
  const fetchPartnerInfo = async () => {
    setLoading(true);
    try {
      const baseURL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "";
      const response = await fetch(`${baseURL}/api/partner/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.currentBalance !== undefined) {
        setPartnerInfo({ currentBalance: data.currentBalance });
      } else {
        setError(data.error || "Ошибка получения данных партнёра");
      }
    } catch (err) {
      setError("Ошибка получения данных партнёра");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerInfo();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    const amountNumber = Number(amount);
    if (!amount || isNaN(amountNumber)) {
      setError("Введите корректную сумму");
      return;
    }
    if (amountNumber < 1000) {
      setError("Минимальная сумма вывода - 1000 рублей");
      return;
    }
    if (partnerInfo && amountNumber > partnerInfo.currentBalance) {
      setError("Запрошенная сумма превышает доступный баланс");
      return;
    }
    if (!contact.trim()) {
      setError("Введите контакт для связи");
      return;
    }
    try {
      const baseURL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "";
      const response = await fetch(`${baseURL}/api/withdrawals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          amount: amountNumber,
          contact: contact.trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(`Заявка создана. Номер заявки: ${data.withdrawalId}`);
        setAmount("");
        setContact("");
      } else {
        setError(data.message || "Ошибка создания заявки");
      }
    } catch (err) {
      setError("Ошибка создания заявки");
    }
  };

  return (
    <div className="partner-withdraw">
      <Title order={2}  mb="md">
        Вывод партнёрских средств
      </Title>
      <Alert color="blue" mb="md">
        Минимальная сумма вывода – 1000 RUB. Доступно для вывода:{" "}
        {partnerInfo ? partnerInfo.currentBalance + " RUB" : <Loader size="xs" />}
      </Alert>
      <Flex direction="column">
        <TextInput
          label="Сумма вывода (RUB)"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextInput
          label="Контакт для связи"
          placeholder="Введите телефон или email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {error && <Alert color="red">{error}</Alert>}
        {success && <Alert color="green">{success}</Alert>}
        <Button onClick={handleSubmit} mt="md">
          Отправить заявку
        </Button>
      </Flex>
    </div>
  );
}
