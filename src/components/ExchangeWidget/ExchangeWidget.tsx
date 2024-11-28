import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import "./ExchangeWidget.scss";
import { RootState } from "../../store/store";

import {
  setCurrency,
  reverseCurrencies,
  setSumGive,
  setSumReceive,
  setLastChangedInput,
  // setInputError,
  // setStep,
  // setName,
  // setBankAccount,
  // setAlert,
} from "../../store/exchangeSlice";
import arrow from "../../images/exchange.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { coins, banks } from "../../utils/config";
import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ExchangeItem from "../ExchangeItem/ExchangeItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { calculateExchange, getExchangeRates } from "../../utils/api";
import { banks } from "../../utils/config";

const useStyles = makeStyles({
  dialogPaper: {
    backgroundColor: "#3a3a3a",
    color: "#fff",
    width: "100%",
    maxWidth: "600px", // Установите максимальную ширину, соответствующую ширине виджета
    borderRadius: "15px",
    padding: "20px",
  },
  dialogTitle: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    paddingBottom: "10px",
  },
  dialogContent: {
    color: "#fff",
    fontSize: "1.2rem",
  },
  dialogActions: {
    justifyContent: "space-between",
    paddingTop: "20px",
  },
  button: {
    backgroundColor: "#ffb300",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ffa000",
    },
  },
  exchangeData: {
    marginBottom: "10px",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    marginBottom: "10px",
  },
});


// Создаем стили

const networkOptions: { [key: string]: string[] } = {
  BTC: ["BTC", "BTC BEP20"],
  ETH: ["ETH", "ETH BEP20"],
  USDT: [
    "Tether TRC20",
    "Tether BEP20",
    "Tether ERC20",
    "Tether SOL",
    "Tether Polygon",
  ],
};

export default function ExchangeWidget() {
  const classes = useStyles();
  const [rates, setRates] = useState<{
    [key: string]: { rub: number; usd: number };
  }>({});
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [telegramNickname, setTelegramNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [selectedNetworkGive, setSelectedNetworkGive] = useState("");
  const [selectedNetworkReceive, setSelectedNetworkReceive] = useState("");
  const [networkError, setNetworkError] = useState("");

  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive, lastChangedInput } = useSelector(
    (state: RootState) => state.exchange
  );

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const isRuble = (currency: string) => {
    const rubCurrencies = [
      "Сбер",
      "Т-Банк",
      "Альфа",
      "СБП",
      "ВТБ",
      "Райф",
      "Газпром",
      "Росбанк",
      "МТС",
      "ОЗОН",
      "Уралсиб",
      "Ак барс",
      "РСХБ",
      "Промсвязь",
      "Ю мани",
      "PAYEER",
    ];
    return rubCurrencies.includes(currency);
  };

  const isFiatCurrency = (currency: string) => {
    return banks.some((bank) => bank.symbol === currency);
  };

  const getRubEquivalent = (currency: string, amount: number) => {
    const curr = isFiatCurrency(currency);
    if (curr) {
      return amount;
    }
    const rate = rates[currency]?.rub;
    return rate ? amount * rate : 0;
  };

  const handleNetworkChangeGive = (event: SelectChangeEvent<string>) => {
    setSelectedNetworkGive(event.target.value);
    setNetworkError(""); // Очистить ошибку при выборе сети
  };

  const handleNetworkChangeReceive = (event: SelectChangeEvent<string>) => {
    setSelectedNetworkReceive(event.target.value);
    setNetworkError(""); // Очистить ошибку при выборе сети
  };

  const handleTelegramNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTelegramNickname(e.target.value);
    if (e.target.value.trim() === "") {
      setNicknameError("Пожалуйста, введите ваш ник в Telegram");
    } else {
      setNicknameError("");
    }
  };

  // Функции для открытия и закрытия диалога
  const handleClickOpen = () => {
    if (Number(sumGive) > 0 && Number(sumReceive) > 0) {
      setOpen(true);
    }
    return;
  };

  const handleClose = () => {
    setOpen(false);
    setOrderCreated(false);
    setOrderId(null);
  };

  const handleContactOperator = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Мой номер заявки: ${orderId}\n` +
        `Я отправляю: ${sumGive} ${instances.give.selectedCurrency}\n` +
        `Я получаю: ${sumReceive} ${instances.receive.selectedCurrency}\n` +
        `${
          selectedNetworkGive || selectedNetworkReceive
            ? `Сеть: ${selectedNetworkGive || selectedNetworkReceive}`
            : ""
        }`
    );
    const telegramUsername = "Coins_change"; // замените на имя пользователя оператора
    window.open(`https://t.me/${telegramUsername}?text=${message}`, "_blank");
  };

  const handleCreateOrder = async () => {
    // Проверяем, что ник заполнен
    if (telegramNickname.trim() === "") {
      setNicknameError("Пожалуйста, введите ваш ник в Telegram");
      return;
    }

    if (
      (["BTC", "ETH", "USDT"].includes(instances.give.selectedCurrency) &&
        selectedNetworkGive === "") ||
      (["BTC", "ETH", "USDT"].includes(instances.receive.selectedCurrency) &&
        selectedNetworkReceive === "")
    ) {
      setNetworkError("Пожалуйста, выберите сеть");
      return;
    }

    setIsLoading(true); // Показать лоадер

    const orderData = {
      amountGive: Number(sumGive.replace(",", ".")),
      currencyGive: instances.give.selectedCurrency,
      amountReceive: Number(sumReceive.replace(",", ".")),
      currencyReceive: instances.receive.selectedCurrency,
      telegramNickname: telegramNickname.trim(), // Добавляем ник в данные заявки
      networkGive: selectedNetworkGive || selectedNetworkReceive, // Добавляем выбранную сеть в заявку
    };

    try {
      const baseURL =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const response = await fetch(`${baseURL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.orderId);
        setOrderCreated(true);
        setNetworkError(""); // Очистить ошибку при выборе сети
        // Здесь отправить письмо админу, вызвав соответствующую функцию на сервере
      } else {
        console.error("Ошибка при создании заявки:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при создании заявки:", error);
    } finally {
      setIsLoading(false); // Скрыть лоадер
    }
  };


  const isFiat = useCallback((curr: string) => {
    return isRuble(curr) ? "RUB" : curr;
  }, []);

  const handleGiveInputChange = useCallback(
    async (value: string) => {
      dispatch(setSumGive(value));
      dispatch(setLastChangedInput("give"));
      const numValue = Number(value.replace(",", "."));
      if (!isNaN(numValue)) {
        const result = await calculateExchange(
          isFiat(instances.give.selectedCurrency),
          isFiat(instances.receive.selectedCurrency),
          numValue,
          "give"
        );

        if (result) {
          dispatch(setSumReceive(result.resultAmount));
        } else {
          dispatch(setSumReceive(""));
        }
      }
    },
    [
      dispatch,
      instances.give.selectedCurrency,
      instances.receive.selectedCurrency,
      isFiat,
    ]
  );

  const handleReceiveInputChange = useCallback(
    async (value: string) => {
      dispatch(setSumReceive(value));
      dispatch(setLastChangedInput("receive"));
      const numValue = Number(value.replace(",", "."));
      if (!isNaN(numValue)) {
        const result = await calculateExchange(
          isFiat(instances.give.selectedCurrency),
          isFiat(instances.receive.selectedCurrency),
          numValue,
          "receive" // Указываем направление изменения
        );
        if (result) {
          dispatch(setSumGive(result.resultAmount));
        } else {
          dispatch(setSumGive(""));
        }
      }
    },
    [
      dispatch,
      instances.give.selectedCurrency,
      instances.receive.selectedCurrency,
      isFiat,
    ]
  );

  const handleGiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "give", currency: currency }));
    // getRate(); // Обновляем курс при изменении валюты
  };
  const handleReceiveCurrencyChange = (e: SelectChangeEvent<string>) => {
    const currency = e.target.value;
    dispatch(setCurrency({ instanceId: "receive", currency: currency }));
    // getRate(); // Обновляем курс при изменении валюты
  };

  const reverse = () => {
    dispatch(reverseCurrencies());
    dispatch(setLastChangedInput(null));
    // getRate();
  };

  const getRatesFromBackend = async () => {
    try {
      const data = await getExchangeRates();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(Date.now());
      } else {
        console.error("No rates data received from backend.");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const isAmountValid = () => {
    const rubEquivalentGive = getRubEquivalent(
      instances.give.selectedCurrency,
      Number(sumGive.replace(",", "."))
    );

    return rubEquivalentGive >= 5000 && rubEquivalentGive <= 10000000;
  };

  useEffect(() => {
    getRatesFromBackend();
    const interval = setInterval(() => {
      getRatesFromBackend();
    }, 120000); // Обновление курсов каждые 2 минуты

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Date.now() - lastUpdated > 120000) {
      // Проверяем, что курсы не устарели более чем на 2 минуты
      getRatesFromBackend();
    }
    if (lastChangedInput === "give" && sumGive !== "") {
      handleGiveInputChange(sumGive);
    } else if (lastChangedInput === "receive" && sumReceive !== "") {
      handleReceiveInputChange(sumReceive);
    }
  }, [
    rates,
    instances.give.selectedCurrency,
    instances.receive.selectedCurrency,
    sumGive,
    sumReceive,
    lastChangedInput,
    handleGiveInputChange,
    handleReceiveInputChange,
    lastUpdated,
  ]);

  const translations = {
    ru: {
      give: "Вы отправляете",
      receive: "Вы получаете",
      change: "СОВЕРШИТЬ ОБМЕН",
    },
    en: {
      give: "You send",
      receive: "You get",
      change: "CHANGE",
    },
  };

  return (
    <div className={"container"} id="widget">
      <div className={"exchange-block"}>
        <ExchangeItem
          title={translations[currentLanguage].give}
          handleInputChange={handleGiveInputChange}
          handleCurrencyChange={handleGiveCurrencyChange}
          way="give"
        />

        <button className={"coin-button"} onClick={reverse} type="button">
          <img
            className="coin-button__img"
            src={arrow}
            alt="Поменять местами валюты"
          />
        </button>
        <ExchangeItem
          title={translations[currentLanguage].receive}
          handleInputChange={handleReceiveInputChange}
          handleCurrencyChange={handleReceiveCurrencyChange}
          way="receive"
        />
      </div>

      <button
        className="exchange-button"
        onClick={handleClickOpen}
        disabled={Date.now() - lastUpdated > 120000}
      >
        {translations[currentLanguage].change}
      </button>
      {Date.now() - lastUpdated > 120000 && (
        <p style={{ color: "red" }}>
          Курс устарел. Пожалуйста, обновите курс для продолжения.
        </p>
      )}
      
      {/* Всплывающее окно с данными об обмене */}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className={classes.dialogTitle}>
          Подтвердите обмен
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <div className={classes.loaderContainer}>
              <CircularProgress color="inherit" />
              <p>Пожалуйста, подождите. Заявка создается...</p>
            </div>
          ) : orderCreated ? (
            // Отображение данных заявки после создания
            <div>
              <p className={classes.text}>Заявка успешно создана!</p>
              <p className={classes.text}>
                Номер заявки: <strong>{orderId}</strong>
              </p>
              <div className={classes.exchangeData}>
                <strong>Ваш ник в Telegram:</strong> {telegramNickname}
              </div>
              <div className={classes.exchangeData}>
                <strong>Вы отправляете:</strong> {sumGive}{" "}
                {instances.give.selectedCurrency}
              </div>
              <div className={classes.exchangeData}>
                <strong>Вы получаете:</strong> {sumReceive}{" "}
                {instances.receive.selectedCurrency}
              </div>
              
            </div>
          ) : (
            // Первоначальное отображение подтверждения обмена
            <div>
              <div className={classes.exchangeData}>
                <strong>Вы отправляете:</strong> {sumGive}{" "}
                {instances.give.selectedCurrency}
              </div>
              <div className={classes.exchangeData}>
                <strong>Вы получаете:</strong> {sumReceive}{" "}
                {instances.receive.selectedCurrency}
              </div>
              {/* Добавляем выбор сети для BTC, ETH, USDT */}
              {networkOptions[instances.give.selectedCurrency] && (
                <div className={classes.exchangeData}>
                  <strong style={{ marginBottom: "10px" }}>
                    Выберите сеть для отправки:
                  </strong>
                  <Select
                    value={selectedNetworkGive}
                    onChange={handleNetworkChangeGive}
                    fullWidth
                    variant="outlined"
                    sx={{ color: "#fff", ".MuiSelect-icon": { color: "#fff" } }}
                    error={!!networkError}
                  >
                    {networkOptions[instances.give.selectedCurrency].map(
                      (network) => (
                        <MenuItem
                          key={network}
                          value={network}
                          sx={{ color: "#fff" }}
                        >
                          {network}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {networkError && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {networkError}
                    </div>
                  )}
                </div>
              )}

              {/* Добавляем выбор сети для получаемой валюты */}
              {networkOptions[instances.receive.selectedCurrency] && (
                <div className={classes.exchangeData}>
                  <strong style={{ marginBottom: "10px" }}>
                    Выберите сеть для получения:
                  </strong>
                  <Select
                    value={selectedNetworkReceive}
                    onChange={handleNetworkChangeReceive}
                    fullWidth
                    variant="outlined"
                    sx={{ color: "#fff", ".MuiSelect-icon": { color: "#fff" } }}
                    error={!!networkError}
                  >
                    {networkOptions[instances.receive.selectedCurrency].map(
                      (network) => (
                        <MenuItem
                          key={network}
                          value={network}
                          sx={{ color: "#fff" }}
                        >
                          {network}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {networkError && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {networkError}
                    </div>
                  )}
                </div>
              )}

              <TextField
                // className={classes.exchangeData}
                label="Ваш ник в Telegram"
                value={telegramNickname}
                onChange={handleTelegramNicknameChange}
                fullWidth
                margin="normal"
                error={!!nicknameError}
                helperText={nicknameError}
                required
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#fff" },
                  ".MuiFormHelperText-root": { color: "#fff" },
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          {orderCreated ? (
            <>
              <Button onClick={handleClose} className={classes.button}>
                Закрыть
              </Button>
              <Button
                onClick={handleContactOperator}
                className={classes.button}
                variant="contained"
              >
                Связаться с оператором
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleClose} className={classes.button}>
                Отмена
              </Button>
              <Button
                onClick={handleCreateOrder}
                className={classes.button}
                variant="contained"
                disabled={!isAmountValid()}
              >
                Создать заявку
              </Button>
            </>
          )}
          {!isAmountValid() && !orderCreated && (
            <div style={{ color: "red", marginTop: "10px" }}>
              Сумма должна быть от 5000 до 10000000 рублей.
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
