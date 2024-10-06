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
import { CircularProgress, SelectChangeEvent, TextField } from "@mui/material";
// import { ReactNode } from "react";
import ExchangeItem from "../ExchangeItem/ExchangeItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getExchangeRates } from "../../utils/api";

// Commission tiers
const commissionTiers = [
  { min: 5000, max: 14999, commission: 0.03 }, // 3% комиссия
  { min: 15000, max: 99999, commission: 0.02 }, // 2% комиссия
  { min: 100000, max: 10000000, commission: 0.01 }, // 1% комиссия
];

function getCommission(amount: number): number {
  for (const tier of commissionTiers) {
    if (amount >= tier.min && amount < tier.max) {
      console.log(`Комиссия для суммы ${amount}: ${tier.commission}`);
      return tier.commission;
    }
  }
  // console.log(`Комиссия для суммы ${amount}: 0`);
  return 0; // Если сумма не попадает ни в один диапазон, комиссия 0%
}

// Создаем стили
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
  // telegramData: {
  //   color: "#fff"
  // }
});

export default function ExchangeWidget() {
  const classes = useStyles();
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [telegramNickname, setTelegramNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  // const [firstRate, setFirstRate] = useState(0);

  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive, lastChangedInput } = useSelector(
    (state: RootState) => state.exchange
  );

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
        `Я получаю: ${sumReceive} ${instances.receive.selectedCurrency}`
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

    setIsLoading(true); // Показать лоадер

    const orderData = {
      amountGive: Number(sumGive.replace(",", ".")),
      currencyGive: instances.give.selectedCurrency,
      amountReceive: Number(sumReceive.replace(",", ".")),
      currencyReceive: instances.receive.selectedCurrency,
      telegramNickname: telegramNickname.trim(), // Добавляем ник в данные заявки
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
        // Здесь вы можете отправить письмо админу, вызвав соответствующую функцию на сервере
      } else {
        console.error("Ошибка при создании заявки:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при создании заявки:", error);
    } finally {
      setIsLoading(false); // Скрыть лоадер
    }
  };

  const getRateForCurrencies = useCallback(
    (fromCurrency: string, toCurrency: string) => {
      const symbolMap: { [key: string]: string } = {
        Sber: "RUB",
        "T-Bank": "RUB",
      };

      const fromSymbol = symbolMap[fromCurrency] || fromCurrency;
      const toSymbol = symbolMap[toCurrency] || toCurrency;

      const fromRate = rates[fromSymbol];
      const toRate = rates[toSymbol];

      if (fromSymbol === "RUB") {
        return fromRate / toRate;
      } else {
        return toRate / fromRate;
      }
    },
    [rates]
  );

  const handleGiveInputChange = useCallback(
    (value: string) => {
      dispatch(setSumGive(value));
      dispatch(setLastChangedInput("give"));
      const numValue = Number(value.replace(",", "."));
      if (!isNaN(numValue) && rates) {
        const rate = getRateForCurrencies(
          instances.give.selectedCurrency,
          instances.receive.selectedCurrency
        );
        // console.log(rate);

        const giveIsFiat =
          instances.give.selectedCurrency === "Sber" ||
          instances.give.selectedCurrency === "T-Bank";
        const receiveIsFiat =
          instances.receive.selectedCurrency === "Sber" ||
          instances.receive.selectedCurrency === "T-Bank";

        let result = 0;

        if (giveIsFiat && !receiveIsFiat) {
          // Пользователь покупает валюту за рубли
          const commissionRate = getCommission(numValue);
          const commission = numValue * commissionRate;
          const netAmount = numValue - commission;
          result = netAmount * rate;
        } else if (!giveIsFiat && receiveIsFiat) {
          // Пользователь продает валюту за рубли
          const grossAmount = numValue / rate;
          const commissionRate = getCommission(grossAmount);
          const commission = grossAmount * commissionRate;
          const netAmount = grossAmount - commission;
          result = netAmount; // Итоговая сумма в рублях
        } else {
          // Обмен между двумя валютами (не RUB)
          result = 0;
        }

        const receiveCurrencyObj = instances.receive.currencies.find(
          (c) => c.symbol === instances.receive.selectedCurrency
        );
        const allowedDecimalPlaces = receiveCurrencyObj?.decimalPlaces ?? 8;

        const formattedResult = result.toFixed(allowedDecimalPlaces);

        dispatch(setSumReceive(formattedResult));
      } else {
        dispatch(setSumReceive(""));
      }
    },
    [
      dispatch,
      instances.give.selectedCurrency,
      instances.receive.currencies,
      instances.receive.selectedCurrency,
      rates,
      getRateForCurrencies,
    ]
  );
  const handleReceiveInputChange = useCallback(
    (value: string) => {
      dispatch(setSumReceive(value));
      dispatch(setLastChangedInput("receive"));
      const numValue = Number(value.replace(",", "."));

      if (!isNaN(numValue) && rates) {
        const rate = getRateForCurrencies(
          instances.give.selectedCurrency,
          instances.receive.selectedCurrency
        );

        const giveIsFiat =
          instances.give.selectedCurrency === "Sber" ||
          instances.give.selectedCurrency === "T-Bank";
        const receiveIsFiat =
          instances.receive.selectedCurrency === "Sber" ||
          instances.receive.selectedCurrency === "T-Bank";

        let result = 0;

        if (!giveIsFiat && receiveIsFiat) {
          // Пользователь продает валюту за рубли
          const grossAmount = numValue / (1 - getCommission(numValue)); // Учитываем комиссию
          result = grossAmount * rate;
        } else if (giveIsFiat && !receiveIsFiat) {
          // Пользователь покупает валюту за рубли
          const amountInRub = numValue / rate;
          const grossAmount = amountInRub / (1 - getCommission(amountInRub));
          result = grossAmount;
        } else {
          // Обмен между двумя валютами (не RUB)
          result = 0;
        }

        const giveCurrencyObj = instances.give.currencies.find(
          (c) => c.symbol === instances.give.selectedCurrency
        );
        const allowedDecimalPlaces = giveCurrencyObj?.decimalPlaces ?? 8;

        const formattedResult = result.toFixed(allowedDecimalPlaces);

        dispatch(setSumGive(formattedResult));
      } else {
        dispatch(setSumGive(""));
      }
    },
    [
      dispatch,
      instances.give.selectedCurrency,
      instances.receive.selectedCurrency,
      instances.give.currencies,
      rates,
      getRateForCurrencies,
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
        // console.log(data.rates);
        // const fixedrates = data.rates.map((el:number) => {
        //   return el.toFixed(8)
        // })
        // console.log(fixedrates);
      } else {
        console.error("No rates data received from backend.");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const getAdjustedRate = () => {
    let rate = getRateForCurrencies(
      instances.give.selectedCurrency,
      instances.receive.selectedCurrency
    );

    let adjustedRate = rate;
    console.log(adjustedRate);

    // const giveIsFiat =
    //   instances.give.selectedCurrency === "Sber" ||
    //   instances.give.selectedCurrency === "T-Bank";
    // const receiveIsFiat =
    //   instances.receive.selectedCurrency === "Sber" ||
    //   instances.receive.selectedCurrency === "T-Bank";

    // if (giveIsFiat && !receiveIsFiat) {
    //   // Пользователь покупает криптовалюту за рубли
    //   // adjustedRate = adjustedRate * (1 + profitMargin);
    // } else if (!giveIsFiat && receiveIsFiat) {
    //   // Пользователь продаёт криптовалюту за рубли
    //   // adjustedRate = adjustedRate * (1 - profitMargin);
    // }

    return adjustedRate;
  };

  const isAmountValid = () => {
    let rubAmount = 0;
    if (
      instances.give.selectedCurrency === "Sber" ||
      instances.give.selectedCurrency === "T-Bank"
    ) {
      rubAmount = Number(sumGive.replace(",", "."));
    } else if (
      instances.receive.selectedCurrency === "Sber" ||
      instances.receive.selectedCurrency === "T-Bank"
    ) {
      rubAmount = Number(sumReceive.replace(",", "."));
    } else {
      // Если рубли не участвуют, считаем сумму валидной
      return true;
    }

    if (isNaN(rubAmount)) return false;

    // Проверяем, попадает ли сумма в диапазон комиссий
    for (const tier of commissionTiers) {
      if (rubAmount >= tier.min && rubAmount <= tier.max) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    getRatesFromBackend();
  }, []);

  // useEffect(() => {
  //   const rate = getAdjustedRate()
  //   setFirstRate(rate)

  // }, [getAdjustedRate])

  // useEffect(() => {
  //   if (instances.give.selectedCurrency && instances.receive.selectedCurrency && rate > 0) {
  //     handleGiveInputChange(sumGive);
  //   }
  // }, [rate, instances.give.selectedCurrency, instances.receive.selectedCurrency, handleGiveInputChange, sumGive]);

  useEffect(() => {
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
  ]);

  return (
    <div className={"container"} id="widget">
      <div className={"exchange-block"}>
        <ExchangeItem
          title="You send"
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
          title="You get"
          handleInputChange={handleReceiveInputChange}
          handleCurrencyChange={handleReceiveCurrencyChange}
          way="receive"
        />
      </div>

      <button className="exchange-button" onClick={handleClickOpen}>
        CHANGE
      </button>
      {/* <p className="exchange-rate"> */}
      {/* exchange rate: 1 {instances.give.selectedCurrency} ~{" "} */}
      {/* {rates ? getAdjustedRate() : "Не удалось загрузить курс"}{" "} */}
      {/* {rates ? firstRate.toFixed(4) : "Не удалось загрузить курс"}{" "} */}
      {/* {instances.receive.selectedCurrency} */}
      {/* </p> */}
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
              {/* <div className={classes.exchangeData}>
                <strong>Курс обмена:</strong> {getAdjustedRate().toFixed(4)}
              </div> */}
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
              {/* <div className={classes.exchangeData}>
                <strong>Курс обмена:</strong> {getAdjustedRate().toFixed(4)}
              </div> */}

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
              Сумма должна быть от {commissionTiers[0].min} до{" "}
              {commissionTiers[commissionTiers.length - 1].max} рублей.
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
