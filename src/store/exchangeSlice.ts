import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { banks, coins } from "../utils/config";
import { ICurrency } from "../types/types";

export interface ExchangeState {
  instances: {
    [key: string]: {
      selectedCurrency: string;
      isBank: boolean;
      selectedIcon: string;
      limitFrom: number;
      limitTo: number;
      inputError: string;
      currencies: ICurrency[];
    };
  };
  sumGive: number;
  sumReceive: number;
  step: number;
  firstName: string;
  lastName: string;
  bankAccount?: string;

  alert: {
    [key in "paid" | "receive"]: {
      message: string;
      severity: "error" | "info" | "success" | "warning" | undefined;
    };
  };
}

const initialState: ExchangeState = {
  instances: {
    give: {
      selectedCurrency: coins[0].symbol,
      isBank: coins[0].isBank,
      // correctBanks: banks.rub,
      // selectedBank: banks.rub[0].name,
      selectedIcon: coins[0].icon,
      limitFrom: 0.005,
      limitTo: 1,
      inputError: "",
      currencies: coins
    },
    receive: {
      selectedCurrency: banks[0].symbol,
      isBank: banks[0].isBank,
      selectedIcon: banks[0].icon,
      limitFrom: 30000,
      limitTo: 5000000,
      inputError: "",
      currencies: banks
    },
  },
  sumGive: 0,
  sumReceive: 0,
  step: 1,
  firstName: "",
  lastName: "",
  bankAccount: "",

  alert: {
    paid: {
      message: "",
      severity: "error",
    },
    receive: {
      message: "",
      severity: "error",
    },
  },
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  // ... другие связанные состояния

  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{ instanceId: string; currency: string }>
    ) => {
      const { instanceId, currency } = action.payload;
      // const lowerCurrency = currency.toLowerCase() as ICurrency; // Утверждение типа
      const instance = state.instances[instanceId];
      if (instance && currency) {
        // Проверка на наличие ключа
        instance.selectedCurrency = currency;
        const curr = instance.currencies.find((el) => el.symbol === currency);

        instance.selectedIcon = curr?.icon || "No data";
        instance.limitFrom =
          currency === "RUB"
            ? 5000
            : currency === "CNY"
            ? 400
            : currency === "UAH"
            ? 2000
            : 0;
        instance.limitTo =
          currency === "RUB"
            ? 300000
            : currency === "CNY"
            ? 25000
            : currency === "UAH"
            ? 50000
            : 0;
        instance.inputError = "";
        state.sumGive = 0;
        state.sumReceive = 0;
      }
    },

    reverseCurrencies: (state) => {
      // Сохраняем текущие значения для инстанса "give"
      const giveCurrency = state.instances.give.selectedCurrency;
      const giveBankIcon = state.instances.give.selectedIcon;
      const giveLimitFrom = state.instances.give.limitFrom;
      const giveLimitTO = state.instances.give.limitTo;
      const currencies = state.instances.give.currencies
      const isBank = state.instances.give.isBank

      // Обновляем инстанс "give" значениями из инстанса "receive"
      state.instances.give.selectedCurrency =
        state.instances.receive.selectedCurrency;
      state.instances.give.selectedIcon = state.instances.receive.selectedIcon;
      state.instances.give.limitFrom = state.instances.receive.limitFrom;
      state.instances.give.limitTo = state.instances.receive.limitTo;
      state.instances.give.inputError = "";
      state.instances.give.currencies = state.instances.receive.currencies
      state.instances.give.isBank = state.instances.receive.isBank


      // Обновляем инстанс "receive" сохраненными ранее значениями инстанса "give"
      state.instances.receive.selectedCurrency = giveCurrency;
      state.instances.receive.selectedIcon = giveBankIcon;
      state.instances.receive.limitFrom = giveLimitFrom;
      state.instances.receive.limitTo = giveLimitTO;
      state.instances.receive.inputError = "";
      state.instances.receive.currencies = currencies
      state.instances.receive.isBank = isBank

      // Обнуляем суммы
      state.sumGive = 0;
      state.sumReceive = 0;
    },
    // setBank: (
    //   state,
    //   action: PayloadAction<{ instanceId: string; bank: string }>
    // ) => {
    //   const { instanceId, bank } = action.payload;
    //   const bankName = state.instances[instanceId].correctBanks.find(
    //     (b) => b.name === bank
    //   );
    //   state.instances[instanceId].selectedBank = bank;
    //   state.instances[instanceId].selectedBankIcon = bankName.icon;
    // },

    setSumGive: (state, action: PayloadAction<number>) => {
      state.sumGive = action.payload;
    },
    setSumReceive: (state, action: PayloadAction<number>) => {
      state.sumReceive = action.payload;
    },
    setInputError: (
      state,
      action: PayloadAction<{ instanceId: string; message: string }>
    ) => {
      state.instances[action.payload.instanceId].inputError =
        action.payload.message;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setName: (
      state,
      action: PayloadAction<{ witch: string; value: string }>
    ) => {
      if (action.payload.witch === "first") {
        state.firstName = action.payload.value;
      } else if (action.payload.witch === "last") {
        state.lastName = action.payload.value;
      }
    },
    setBankAccount: (state, action: PayloadAction<string | number>) => {
      state.bankAccount = action.payload.toString();
    },

    setAlert: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: "error" | "info" | "success" | "warning";
        instanceId: "receive" | "paid";
      }>
    ) => {
      if (action.payload.instanceId === "receive") {
        state.alert.receive.message = action.payload.message;
        state.alert.receive.severity = action.payload.severity;
      } else if (action.payload.instanceId === "paid") {
        state.alert.paid.message = action.payload.message;
        state.alert.paid.severity = action.payload.severity;
      }
    },
    // ... другие редьюсеры для обновления состояния
  },
});

export const {
  setCurrency,
  reverseCurrencies,
  setSumGive,
  setSumReceive,
  setInputError,
  setStep,
  setName,
  setBankAccount,
  setAlert,
} = exchangeSlice.actions;

// export const {currencyGive} = currencySlice.

export default exchangeSlice.reducer;
