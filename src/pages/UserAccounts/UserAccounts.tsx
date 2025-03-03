import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextInput,
  Table,
  Title,
  Text,
  Group,
  useCombobox,
  Combobox,
  InputBase,
  Input,
  ScrollArea,
} from "@mantine/core";
import { coins, banks, allSystems } from "../../utils/config";
import "./UserAccounts.scss";

interface IAccount {
  _id: string; // MongoDB id
  user: string; // userId
  system: string; // Название системы (например, "BTC" или "Сбер")
  accountNumber: string;
  extraInfo: string;
  // Могут быть поля createdAt, updatedAt, etc.
}

// Локальный тип для хранения состояния редактирования
interface IEditableAccount extends IAccount {
  isEditing?: boolean;
  // Можно хранить поля для редактирования (draftSystem, draftAccountNumber, ...),
  // если хотите менять system. В примере редактируем только accountNumber и extraInfo
}

export default function UserAccounts() {
  const baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
  const [accounts, setAccounts] = useState<IEditableAccount[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedItem = [...banks, ...coins].find(
    (item) => item.symbol === selectedSystem
  );

  async function handleAddAccount() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Не авторизован");
      return;
    }

    const selectedItem = [...banks, ...coins].find(
      (item) => item.symbol === selectedSystem
    );
    if (!selectedItem) {
      alert("Неверная платёжная система");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          system: selectedSystem,
          accountNumber,
          extraInfo,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert("Ошибка при добавлении счёта: " + errData.error);
        return;
      }

      const newAcc = await res.json();
      // newAcc = { _id, user, system, accountNumber, extraInfo, createdAt, ... }

      // Вставляем в локальный стейт
      setAccounts((prev) => [...prev, newAcc]);

      // Сбрасываем поля
      setSelectedSystem(null);
      setAccountNumber("");
      setExtraInfo("");
    } catch (error) {
      console.error(error);
      alert("Ошибка при запросе на сервер");
    }
  }

  // Проверяем, банк или монета
  // const isBank = banks.some((bank) => bank.symbol === selectedSystem);

  // const options = [...banks, ...coins]
  //   .filter((item) =>
  //     item.symbol.toLowerCase().includes(search.toLowerCase().trim())
  //   )
  //   .map((item) => (
  //     <Combobox.Option value={item.symbol} key={item.symbol}>
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         {item.symbol}

  //         <img
  //           src={item?.icon}
  //           alt={item.symbol}
  //           className="userAccounts__img"
  //         />
  //       </div>
  //     </Combobox.Option>
  //   ));
  // Утилита для проверки, банк это или нет
  const isBank = (symbol: string) => {
    const systemItem = allSystems.find((item) => item.symbol === symbol);
    return systemItem ? systemItem.isBank : false;
  };

  // Список опций для combobox
  const filtered = allSystems.filter((item) =>
    item.symbol.toLowerCase().includes(search.toLowerCase().trim())
  );
  const options = filtered.map((item) => (
    <Combobox.Option value={item.symbol} key={item.symbol}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {item.symbol}
        <img src={item.icon} alt={item.symbol} className="userAccounts__img" />
      </div>
    </Combobox.Option>
  ));

  // 2) Удаление счёта (DELETE /api/accounts/:id)
  const handleDeleteAccount = async (id: string) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Нет токена");
      return;
    }

    // Подтверждаем удаление
    if (!window.confirm("Точно удалить счёт?")) {
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/accounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert("Ошибка при удалении счёта: " + (errorData.error || ""));
        return;
      }
      // Убираем из стейта
      setAccounts((prev) => prev.filter((acc) => acc._id !== id));
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  // 3) Переключение режима «Редактировать» для конкретного счёта
  const handleEditToggle = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc._id === id ? { ...acc, isEditing: !acc.isEditing } : acc
      )
    );
  };

  // 4) Обработчик изменения полей accountNumber/extraInfo в режиме редактирования
  const handleEditChange = (
    id: string,
    field: "accountNumber" | "extraInfo",
    value: string
  ) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc._id === id) {
          return { ...acc, [field]: value };
        }
        return acc;
      })
    );
  };

  // 5) Сохранение изменений (PATCH /api/accounts/:id)
  const handleSaveAccount = async (id: string) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Нет токена");
      return;
    }

    const accountToSave = accounts.find((acc) => acc._id === id);
    if (!accountToSave) return;

    try {
      const res = await fetch(`${baseURL}/api/accounts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // system: accountToSave.system, // при желании можно менять
          accountNumber: accountToSave.accountNumber,
          extraInfo: accountToSave.extraInfo,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Ошибка при обновлении: " + (errorData.error || ""));
        return;
      }

      const updatedAcc = await res.json();
      // Обновляем в стейте
      setAccounts((prev) =>
        prev.map((acc) =>
          acc._id === id ? { ...updatedAcc, isEditing: false } : acc
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    fetch(`${baseURL}/api/accounts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => console.error("Error loading accounts:", err));
  }, []);

  return (
    <Box className="userAccounts">
      <Title order={3} className="userAccounts__title">
        Ваши счета
      </Title>
      <Text size="sm" className="userAccounts__info">
        Чтобы добавить счёт, заполните форму ниже.
      </Text>

      {/* Форма добавления нового счёта */}
      <Group mb="md" className="userAccounts__form">
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setSelectedSystem(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              style={{
                minWidth: "180px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {selectedSystem || (
                  <Input.Placeholder>Платёжная система</Input.Placeholder>
                )}
                {selectedSystem && (
                  <img
                    src={
                      allSystems.find((sys) => sys.symbol === selectedSystem)
                        ?.icon
                    }
                    alt={selectedSystem}
                    className="userAccounts__img"
                  />
                )}
              </div>
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Search
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Поиск"
            />
            <Combobox.Options>
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options.length > 0 ? (
                  options
                ) : (
                  <>
                    <Combobox.Group label="Banks">
                      {allSystems
                        .filter((el) => el.isBank)
                        .map((el) => (
                          <Combobox.Option
                            key={el.symbol}
                            value={el.symbol}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {el.symbol}
                            <img
                              className="userAccounts__img"
                              src={el.icon}
                              alt={el.symbol}
                            />
                          </Combobox.Option>
                        ))}
                    </Combobox.Group>

                    <Combobox.Group label="Coins">
                      {allSystems
                        .filter((el) => !el.isBank)
                        .map((el) => (
                          <Combobox.Option
                            key={el.symbol}
                            value={el.symbol}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {el.symbol}
                            <img
                              className="userAccounts__img"
                              src={el.icon}
                              alt={el.symbol}
                            />
                          </Combobox.Option>
                        ))}
                    </Combobox.Group>
                  </>
                )}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <TextInput
          placeholder="Номер счёта"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.currentTarget.value)}
          className="userAccounts__input"
        />

        <TextInput
          placeholder={isBank(selectedSystem || "") ? "Получатель" : "Сеть"}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.currentTarget.value)}
          className="userAccounts__input"
        />

        <Button onClick={handleAddAccount} className="userAccounts__addButton">
          Добавить счёт
        </Button>
      </Group>

      
      {/* Таблица аккаунтов, если они есть */}
      {accounts.length > 0 && (
        <ScrollArea>
        <Table highlightOnHover className="userAccounts__table">
          <thead>
            <tr>
              <th>Платёжная система</th>
              <th>Номер счёта</th>
              <th>Доп. инфо</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => {
              const systemData = allSystems.find(
                (s) => s.symbol === acc.system
              );

              if (acc.isEditing) {
                // Рендерим поля редактирования
                return (
                  <tr key={acc._id}>
                    <td>
                      {acc.system}
                      {systemData && (
                        <img
                          src={systemData.icon}
                          alt={acc.system}
                          className="userAccounts__img"
                        />
                      )}
                    </td>
                    <td>
                      <TextInput
                        value={acc.accountNumber}
                        onChange={(e) =>
                          handleEditChange(
                            acc._id,
                            "accountNumber",
                            e.currentTarget.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <TextInput
                        value={acc.extraInfo}
                        onChange={(e) =>
                          handleEditChange(
                            acc._id,
                            "extraInfo",
                            e.currentTarget.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => handleSaveAccount(acc._id)}
                        variant="outline"
                        color="green"
                        size="xs"
                      >
                        Сохранить
                      </Button>{" "}
                      <Button
                        onClick={() => handleEditToggle(acc._id)}
                        variant="outline"
                        color="gray"
                        size="xs"
                      >
                        Отмена
                      </Button>
                    </td>
                  </tr>
                );
              } else {
                // Рендерим обычный режим
                return (
                  <tr key={acc._id}>
                    <td>
                      <Group>
                        {acc.system}
                        {systemData && (
                          <img
                            src={systemData.icon}
                            alt={acc.system}
                            className="userAccounts__img"
                          />
                        )}
                      </Group>
                    </td>
                    <td>{acc.accountNumber}</td>
                    <td>{acc.extraInfo}</td>
                    <td>
                      <Button
                        onClick={() => handleEditToggle(acc._id)}
                        variant="outline"
                        size="xs"
                      >
                        Изменить
                      </Button>{" "}
                      <Button
                        onClick={() => handleDeleteAccount(acc._id)}
                        variant="outline"
                        color="red"
                        size="xs"
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
        </ScrollArea>
      )}
    </Box>
  );
}
