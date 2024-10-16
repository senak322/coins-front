import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from './exchangeSlice';
import languageReducer from "./languageSlice"; 

const store = configureStore({
    reducer: {
      exchange: exchangeReducer,
      language: languageReducer, // срез языка
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;