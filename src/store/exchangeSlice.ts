import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { banks, coins } from "../utils/config";
import { ICurrency } from "../types/types";


export interface ExchangeState {
  instances: {
    [key: string]: {
      selectedCurrency: string;
      isBank: boolean;
      selectedIcon: string;
      inputError: string;
      currencies: ICurrency[];
    };
  };
  // rates: {[key: string]: number} | null;
  sumGive: string;
  sumReceive: string;
  step: number;
  firstName: string;
  lastName: string;
  bankAccount?: string;
  lastChangedInput: "give" | "receive" | null
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
      selectedIcon: coins[0].icon,
      inputError: "",
      currencies: coins,
    },
    receive: {
      selectedCurrency: banks[0].symbol,
      isBank: banks[0].isBank,
      selectedIcon: banks[0].icon,
      inputError: "",
      currencies: banks,
    },
  },
  // rates: null,
  sumGive: "",
  sumReceive: "",
  step: 1,
  firstName: "",
  lastName: "",
  bankAccount: "",
  lastChangedInput: null,
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

// export const fetchExchangeRates = createAsyncThunk(
//   "exchange/fetchExchangeRates",
//   async () => {
//     const response = await axios.get(
//       "https://min-api.cryptocompare.com/data/pricemulti",
//       {
//         params: {
//           fsyms: "BTC,ETH,LTC,USDT,XMR,TON,DOGE,USDC,SOL,DAI,ADA",
//           tsyms: "RUB",
//         },
//       }
//     );

//     return response.data;
//   }
// );

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
        instance.inputError = "";
        state.sumGive = "0";
        state.sumReceive = "0";
      }
    },

    reverseCurrencies: (state) => {
      // Сохраняем текущие значения для инстанса "give"
      const tempInstance = { ...state.instances.give };
      // const tempSumGive = state.sumGive;

      // Обновляем инстанс "give" значениями из инстанса "receive"
      state.instances.give = { ...state.instances.receive };

      // Обновляем инстанс "receive" сохраненными ранее значениями инстанса "give"
      state.instances.receive = tempInstance;

      // Обмениваем суммы
      state.sumGive = "";
      state.sumReceive = "";
      
      
    },
    setLastChangedInput: (
      state,
      action: PayloadAction<"give" | "receive" | null>
    ) => {
      state.lastChangedInput = action.payload;
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

    setSumGive: (state, action: PayloadAction<string>) => {
      state.sumGive = action.payload;
    },
    setSumReceive: (state, action: PayloadAction<string>) => {
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
    // extraReducers: (builder) => {
    //   builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
    //     const rawRates = action.payload;
    //     const rates: { [key: string]: number } = {};
    //     for (const [currency, rateData] of Object.entries(rawRates)) {
    //       if (typeof rateData === "object" && rateData !== null && "RUB" in rateData) {
    //         rates[currency] = rateData["RUB"];
    //       }
    //     }
    //     state.rates = rates;
    //   });
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
  setLastChangedInput,
} = exchangeSlice.actions;

// export const {currencyGive} = currencySlice.

export default exchangeSlice.reducer;
