import React, { useState } from "react";
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
import { coins, banks } from "../../utils/config";
import "./UserAccounts.scss";

// Объявляем этот компонент либо рядом, либо в отдельном файле:
// import { forwardRef } from "react";

// const SelectItem = forwardRef<HTMLDivElement, any>(
//   ({ label, icon, ...others }, ref) => (
//     <div ref={ref} {...others}>
//       <Group >
//         {icon && <Avatar src={icon} size="sm" />}
//         <Text>{label}</Text>
//       </Group>
//     </div>
//   )
// );

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
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedItem = [...banks, ...coins].find(
    (item) => item.symbol === selectedSystem
  );

  const handleAddAccount = () => {
    if (!selectedSystem || !accountNumber.trim() || !extraInfo.trim()) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

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

  const options = [...banks, ...coins]
    .filter((item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase().trim())
    )
    .map((item) => (
      <Combobox.Option value={item.symbol} key={item.symbol}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {item.symbol}

          <img
            src={item?.icon}
            alt={item.symbol}
            className="userAccounts__img"
          />
        </div>
      </Combobox.Option>
    ));

  return (
    <Box className="userAccounts">
      <Title order={3} className="userAccounts__title">
        Ваши счета
      </Title>
      <Text size="sm" className="userAccounts__info">
        Чтобы добавить счёт в платёжную систему, заполните форму ниже.
      </Text>

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
                    src={selectedItem?.icon}
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
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Поиск"
            />
            <Combobox.Options>
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options.length > 0 ? (
                  options
                ) : (
                  <>
                    <Combobox.Group label="Banks">
                      {banks.map((el) => {
                        return (
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
                            />{" "}
                          </Combobox.Option>
                        );
                      })}
                    </Combobox.Group>

                    <Combobox.Group label="Coins">
                      {coins.map((el) => {
                        return (
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
                            />{" "}
                          </Combobox.Option>
                        );
                      })}
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
              <th>Доп. инфо</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>
                  <Group>
                    {account.system}
                    <img
                      src={account.icon}
                      alt={account.system}
                      className="userAccounts__img"
                    />
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
