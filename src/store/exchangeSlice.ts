import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExchangeState {
  amount: number;
  selectedCurrency: 'BTC' | 'ETH';
  outputCurrency: 'BTC' | 'ETH';
  outputAmount: number;
  exchangeRate: number;
}

const initialState: ExchangeState = {
  amount: 0.1,
  selectedCurrency: 'BTC',
  outputCurrency: 'ETH',
  outputAmount: 1.81550073,
  exchangeRate: 18.06, // Пример курса обмена
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    changeAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      state.outputAmount = action.payload * state.exchangeRate;
    },
    changeCurrency: (state) => {
      const newCurrency = state.selectedCurrency === 'BTC' ? 'ETH' : 'BTC';
      state.selectedCurrency = newCurrency;
      state.outputCurrency = newCurrency === 'BTC' ? 'ETH' : 'BTC';
      state.exchangeRate = newCurrency === 'BTC' ? 18.06 : 0.055; // Пример курсов
      state.outputAmount = state.amount * state.exchangeRate;
    },
  },
});

export const { changeAmount, changeCurrency } = exchangeSlice.actions;

export default exchangeSlice.reducer;
