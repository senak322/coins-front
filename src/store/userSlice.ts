import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  login: string;
  email: string;
  last_name?: string;
  first_name?: string;
  phone?: string;
  tg?: string;
  twoFA: boolean;
  role_id: 1 | 2;
  emailNotificationsEnabled: boolean;
}

// Определяем структуру для стейта user
interface UserState {
  user: User | null; // null, если не залогинен
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Экшен для установки данных пользователя (после логина/верификации)
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    // Экшен для логаута (очистка пользователя)
    clearUser(state) {
      state.user = null;
    },
    setIs2FAEnabled(state, action: PayloadAction<boolean>) {
      state.user!.twoFA = action.payload;
    },
    setEmailNotificationsEnabled(state, action: PayloadAction<boolean>) {
      state.user!.emailNotificationsEnabled = action.payload;
    }
  },
});

// Экшены, которые будем диспатчить
export const { setUser, clearUser, setIs2FAEnabled, setEmailNotificationsEnabled } = userSlice.actions;

// Экспортируем редюсер, чтобы подключить в store
export default userSlice.reducer;
