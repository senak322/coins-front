import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: "ru" | "en";
}

const initialState: LanguageState = {
  currentLanguage: "ru",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<"ru" | "en">) {
      state.currentLanguage = action.payload;
    },
    toggleLanguage(state) {
      state.currentLanguage = state.currentLanguage === "ru" ? "en" : "ru";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
