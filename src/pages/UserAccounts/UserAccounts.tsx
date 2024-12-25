import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { coins, banks } from "../../utils/config";
import styles from "./UserAccounts.module.scss"; // Импорт CSS Modules

interface Account {
  system: string;
  accountNumber: string;
  extraInfo: string;
  icon: string;
}

export default function UserAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");

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

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setSelectedSystem("");
    setAccountNumber("");
    setExtraInfo("");
  };

  const handleSystemChange = (event: SelectChangeEvent<string>) => {
    setSelectedSystem(event.target.value);
    setExtraInfo(""); // Сбрасываем "дополнительную информацию" при смене системы
  };

  const isBank = banks.some((bank) => bank.symbol === selectedSystem);

  return (
    <Box className={styles.userAccounts}>
      <Typography variant="h5" className={styles.userAccounts__title}>
        Ваши счета
      </Typography>
      <Typography variant="body2" className={styles.userAccounts__info}>
        Чтобы добавить счёт в платёжную систему, заполните форму ниже.
      </Typography>

      <Box className={styles.userAccounts__form}>
        <Select
          value={selectedSystem}
          onChange={handleSystemChange}
          displayEmpty
          fullWidth
          className={styles.userAccountsSelect}
          MenuProps={{
            PaperProps: {
              className: styles.userAccountsMenuPaper,
            },
          }}
        >
          <MenuItem value="" disabled sx={{ color: "#000" }}>
            Выберите платёжную систему
          </MenuItem>
          <MenuItem disabled>
            <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
              Банки
            </Typography>
          </MenuItem>
          {banks.map((bank) => (
            <MenuItem
              key={bank.symbol}
              value={bank.symbol}
              className={styles.userAccountsMenuItem}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={bank.icon}
                  alt={bank.symbol}
                  style={{ width: "20px", height: "20px", borderRadius: "4px" }}
                />
                {bank.symbol}
              </Box>
            </MenuItem>
          ))}
          <MenuItem disabled>
            <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
              Монеты
            </Typography>
          </MenuItem>
          {coins.map((coin) => (
            <MenuItem
              key={coin.symbol}
              value={coin.symbol}
              className={styles.userAccountsMenuItem}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={coin.icon}
                  alt={coin.symbol}
                  style={{ width: "20px", height: "20px", borderRadius: "4px" }}
                />
                {coin.symbol}
              </Box>
            </MenuItem>
          ))}
        </Select>

        <TextField
          placeholder="Номер счёта"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <TextField
          placeholder={isBank ? "Получатель" : "Сеть"}
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleAddAccount}
          className={styles.userAccounts__addButton}
        >
          Добавить
        </Button>
      </Box>

      <Box className={styles.userAccounts__list}>
        <Typography variant="h6" className={styles.userAccounts__listTitle}>
          Добавленные счета:
        </Typography>
        <Box className={styles.userAccounts__table}>
          <table>
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={account.icon}
                        alt={account.system}
                        style={{ width: "20px", height: "20px", borderRadius: "4px" }}
                      />
                      {account.system}
                    </Box>
                  </td>
                  <td>{account.accountNumber}</td>
                  <td>{account.extraInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}
