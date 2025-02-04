import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Link,
} from "@mui/material";
import "./Auth.scss";
import { login } from "../../services/authAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUser } from "../../store/userSlice";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRegisterClick: () => void; // Новый проп для открытия регистрации
}

export default function SignInModal({
  open,
  onClose,
  onSuccess,
  onRegisterClick,
}: SignInModalProps) {
  const baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!loginInput.trim() || !password.trim()) {
      setError("Логин и пароль обязательны.");
      return;
    }

    try {
      const { user } = await login(loginInput, password); // API запрос
      if (user.is2FAEnabled) {
        // Показать модальное окно для ввода 2FA кода
        const code = prompt('Enter your 2FA code');
        const verifyResponse = await fetch(`${baseURL}/api/auth/2fa/verify`, {
          method: 'POST',
          body: JSON.stringify({ userId: user._id, token: code })
        });
        
        if (!verifyResponse.ok) {
          throw new Error('Invalid 2FA code')}
        
        const { token } = await verifyResponse.json();
      localStorage.setItem("jwt", token); // Сохраняем токен
      dispatch(setUser(user));
      onSuccess();
      onClose();
    }}catch (err: any) {
      setError(err.response?.data?.error || "Ошибка входа.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="auth-dialog">
      <DialogTitle className="auth-dialog__title">Авторизация</DialogTitle>
      <DialogContent dividers className="auth-dialog__content">
      {error && <div className="auth-dialog__error">{error}</div>}
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Логин или e-mail</div>
          <TextField
            placeholder="Логин или e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
          />
        </div>
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Пароль</div>
          <TextField
            placeholder="Пароль"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </DialogContent>
      <DialogActions className="auth-dialog__actions">
        <Button className="auth-dialog__footer-links">
          <Link
            component="button"
            onClick={onRegisterClick}
            className="auth-dialog__link"
          >
            Регистрация
          </Link>
          {/* Можно добавить также "Забыли пароль?" при необходимости */}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="auth-dialog__submit-button"
        >
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
