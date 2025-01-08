import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Select,
  TextInput,
  Table,
  Title,
  Text,
  Group,
  Avatar,
} from "@mantine/core";
import { coins, banks } from "../../utils/config";
import "./UserAccounts.scss";

// Объявляем этот компонент либо рядом, либо в отдельном файле:
import { forwardRef } from "react";

const SelectItem = forwardRef<HTMLDivElement, any>(
  ({ label, icon, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group >
        {icon && <Avatar src={icon} size="sm" />}
        <Text>{label}</Text>
      </Group>
    </div>
  )
);

interface Account {
  system: string;
  accountNumber: string;
  extraInfo: string;
  icon: string;
}

export default function UserAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");

  const selectData = useMemo(() => {
    return [
      {
        group: "Банки",
        items: banks.map((bank) => ({
          label: bank.symbol,
          value: bank.symbol,
          icon: bank.icon,
        })),
      },
      {
        group: "Монеты",
        items: coins.map((coin) => ({
          label: coin.symbol,
          value: coin.symbol,
          icon: coin.icon,
        })),
      },
    ];
  }, []);

  const handleAddAccount = () => {
    if (!selectedSystem || !accountNumber.trim() || !extraInfo.trim()) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const selectedItem = [...banks, ...coins].find(
      (item) => item.symbol === selectedSystem
    );

    if (!selectedItem) {
      alert("Выберите платёжную систему.");
      return;
    }

    const newAccount = {
      system: selectedSystem,
      accountNumber,
      extraInfo,
      icon: selectedItem.icon,
    };

    setAccounts((prev) => [...prev, newAccount]);
    setSelectedSystem(null);
    setAccountNumber("");
    setExtraInfo("");
  };

  // Проверяем, банк или монета
  const isBank = banks.some((bank) => bank.symbol === selectedSystem);

  return (
    <Box className="userAccounts">
      <Title order={3} className="userAccounts__title">
        Ваши счета
      </Title>
      <Text size="sm" className="userAccounts__info">
        Чтобы добавить счёт в платёжную систему, заполните форму ниже.
      </Text>

      <Group mb="md" className="userAccounts__form">
        <Select
          data={selectData}
          component={SelectItem} // используем кастомный компонент
          placeholder="Выберите платёжную систему"
          value={selectedSystem}
          onChange={setSelectedSystem}
          searchable
          nothingFoundMessage="Ничего не найдено..."
          maxDropdownHeight={200}
          className="userAccounts__select"
          styles={{
            dropdown: {
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
            input: {
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            },
          }}
        />

        <TextInput
          placeholder="Номер счёта"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.currentTarget.value)}
          className="userAccounts__input"
        />

        <TextInput
          placeholder={isBank ? "Получатель" : "Сеть"}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.currentTarget.value)}
          className="userAccounts__input"
        />

        <Button onClick={handleAddAccount} className="userAccounts__addButton">
          Добавить счёт
        </Button>
      </Group>

      {accounts.length > 0 && (
        <Table highlightOnHover className="userAccounts__table">
          <thead>
            <tr>
              <th>Платёжная система</th>
              <th>Номер счёта</th>
              <th>{isBank ? "Получатель" : "Сеть"}</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>
                  <Group>
                    <Avatar src={account.icon} size="sm" />
                    {account.system}
                  </Group>
                </td>
                <td>{account.accountNumber}</td>
                <td>{account.extraInfo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Box>
  );
}
