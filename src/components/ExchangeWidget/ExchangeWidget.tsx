import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import "./ExchangeWidget.scss";
import { RootState } from "../../store/store";
import {
  setCurrency,
  reverseCurrencies,
  setSumGive,
  setSumReceive,
  // setInputError,
  // setStep,
  // setName,
  // setBankAccount,
  // setAlert,
} from "../../store/exchangeSlice";
import arrow from "../../images/exchange.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { coins, banks } from "../../utils/config";
import { SelectChangeEvent } from "@mui/material";
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
import { getExchangeRate } from "../../utils/api";

// Commission tiers
const commissionTiers = [
  { min: 5000, max: 15000, commission: 0.03 }, // 3% комиссия
  { min: 15000, max: 100000, commission: 0.02 }, // 2% комиссия
  { min: 100000, max: 10000000, commission: 0.1 }, // 1% комиссия
];

function getCommission(amount: number): number {
  for (const tier of commissionTiers) {
    if (amount >= tier.min && amount < tier.max) {
      return tier.commission;
    }
  }
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
});

export default function ExchangeWidget() {
  const classes = useStyles();
  const [rate, setRate] = useState<number>(0);
  const [lastChangedInput, setLastChangedInput] = useState<
    "give" | "receive" | null
  >(null);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );

  // Функции для открытия и закрытия диалога
  const handleClickOpen = () => {
    if (Number(sumGive) > 0 && Number(sumReceive) > 0) {
      setOpen(true);
    }
    return;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateOrder = () => {
    // Здесь вы можете добавить логику для создания заявки
    // Например, отправить данные на сервер или перейти на другую страницу

    // После создания заявки можно закрыть диалог
    setOpen(false);
  };

  const handleGiveInputChange = useCallback(
    (value: string) => {
      dispatch(setSumGive(value));
      setLastChangedInput("give");
      const numValue = Number(value.replace(",", "."));
      if (!isNaN(numValue) && rate > 0) {
        let adjustedRate = rate;

        // Проверяем, отправляет ли пользователь рубли
        if (
          instances.give.selectedCurrency === "Sber" ||
          instances.give.selectedCurrency === "T-bank"
        ) {
          const commissionRate = getCommission(numValue);
          console.log(commissionRate);

          // Вычитаем комиссию из курса
          adjustedRate = rate * (1 - commissionRate);
          console.log("rate" + rate);
          console.log("adjustedRate" + adjustedRate);
        } else if (
          instances.receive.selectedCurrency === "Sber" ||
          instances.receive.selectedCurrency === "T-bank"
        ) {
          // Если пользователь получает рубли, комиссия рассчитывается на основе суммы в рублях, которую он получит
          const estimatedRubAmount = numValue * rate;
          const commissionRate = getCommission(estimatedRubAmount);
          console.log(commissionRate);
          // Прибавляем комиссию к курсу
          adjustedRate = rate * (1 + commissionRate);
        }

        const result = numValue * adjustedRate;

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
      rate,
    ]
  );
  const handleReceiveInputChange = useCallback(
    (value: string) => {
      dispatch(setSumReceive(value));
      setLastChangedInput("receive");
      const numValue = Number(value.replace(",", "."));

      if (!isNaN(numValue) && rate > 0) {
        let adjustedRate = rate;

        // Проверяем, получает ли пользователь рубли
        if (
          instances.receive.selectedCurrency === "Sber" ||
          instances.receive.selectedCurrency === "T-bank"
        ) {
          const commissionRate = getCommission(numValue);
          // Прибавляем комиссию к курсу
          adjustedRate = rate * (1 + commissionRate);
        } else if (
          instances.give.selectedCurrency === "Sber" ||
          instances.give.selectedCurrency === "T-bank"
        ) {
          // Если пользователь отправляет рубли, комиссия рассчитывается на основе суммы в рублях, которую он отправляет
          const estimatedRubAmount = numValue / rate;
          const commissionRate = getCommission(estimatedRubAmount);
          // Вычитаем комиссию из курса
          adjustedRate = rate * (1 - commissionRate);
        }

        const result = numValue / adjustedRate;

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
      rate,
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
    // getRate();
  };

  const getRate = async () => {
    const symbolMap: { [key: string]: string } = {
      Sber: "RUB",
      "T-Bank": "RUB",
    };
    const giveCurrency =
      symbolMap[instances.give.selectedCurrency] ||
      instances.give.selectedCurrency.toUpperCase();
    const receiveCurrency =
      symbolMap[instances.receive.selectedCurrency] ||
      instances.receive.selectedCurrency.toUpperCase();

    try {
      const exchangeRate = await getExchangeRate(giveCurrency, receiveCurrency);
      setRate(exchangeRate); // Устанавливаем курс в состояние
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate(0); // В случае ошибки сбрасываем курс
    }
  };

  const getAdjustedRate = () => {
    let adjustedRate = rate;
    if (
      instances.give.selectedCurrency === "Sber" ||
      instances.give.selectedCurrency === "T-Bank"
    ) {
      const rubAmount = Number(sumGive.replace(",", ".")) || 0;
      const commissionRate = getCommission(rubAmount);
      adjustedRate = rate * (1 - commissionRate);
    } else if (
      instances.receive.selectedCurrency === "Sber" ||
      instances.receive.selectedCurrency === "T-Bank"
    ) {
      const rubAmount = Number(sumReceive.replace(",", ".")) || 0;
      const commissionRate = getCommission(rubAmount);
      adjustedRate = rate * (1 + commissionRate);
    }
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
    getRate();
  }, [instances.give.selectedCurrency, instances.receive.selectedCurrency]);

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
    rate,
    instances.give.selectedCurrency,
    instances.receive.selectedCurrency,
    lastChangedInput,
    sumGive,
    sumReceive,
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
      <p className="exchange-rate">
        exchange rate: 1 {instances.give.selectedCurrency} ~{" "}
        {rate ? getAdjustedRate().toFixed(4) : "Не удалось загрузить курс"}{" "}
        {instances.receive.selectedCurrency}
      </p>
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
          <div className={classes.exchangeData}>
            <strong>Вы отправляете:</strong> {sumGive}{" "}
            {instances.give.selectedCurrency}
          </div>
          <div className={classes.exchangeData}>
            <strong>Вы получаете:</strong> {sumReceive}{" "}
            {instances.receive.selectedCurrency}
          </div>
          <div className={classes.exchangeData}>
            <strong>Курс обмена:</strong> {getAdjustedRate().toFixed(4)}
          </div>
          {/* Вы можете добавить дополнительные данные или стилизовать их */}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
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
          {!isAmountValid() && (
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
