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
  // Состояния для 2FA
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  // Сохраняем временно данные пользователя для прохождения 2FA
  const [tempUser, setTempUser] = useState<any>(null);

  const dispatch = useAppDispatch();

  const handleLoginSubmit = async () => {
    if (!loginInput.trim() || !password.trim()) {
      setError("Логин и пароль обязательны.");
      return;
    }

    try {
      // API запрос на вход
      const { user, token } = await login(loginInput, password);
      if (user.twoFA) {
        // Сохраняем весь объект пользователя, а не только userId
        setTempUser(user);
        setIs2FADialogOpen(true);
      } else {
        // Если 2FA не требуется – сохраняем токен и обновляем состояние пользователя
        localStorage.setItem("jwt", token);
        dispatch(setUser(user));
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Ошибка входа.");
    }
  };

  const handle2FASubmit = async () => {
    if (!twoFACode.trim() || !tempUser) {
      setError("Введите код двухфакторной аутентификации.");
      return;
    }
    try {
      const verifyResponse = await fetch(`${baseURL}/api/auth/2fa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: tempUser._id, token: twoFACode }),
      });
      if (!verifyResponse.ok) {
        throw new Error("Неверный 2FA код");
      }
      const data = await verifyResponse.json();
      const jwtToken = data.token;
      localStorage.setItem("jwt", jwtToken);
      dispatch(setUser(tempUser));
      onSuccess();
      onClose();
      setIs2FADialogOpen(false);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Ошибка двухфакторной аутентификации."
      );
    }
  };

  return (
    <>
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
          </Button>
          <Button
            variant="contained"
            onClick={handleLoginSubmit}
            className="auth-dialog__submit-button"
          >
            Войти
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно для ввода 2FA кода */}
      <Dialog
        open={is2FADialogOpen}
        onClose={() => setIs2FADialogOpen(false)}
        className="auth-dialog"
      >
        <DialogTitle className="auth-dialog__title">
          Двухфакторная аутентификация
        </DialogTitle>
        <DialogContent dividers className="auth-dialog__content">
          <TextField
            placeholder="Введите 2FA код"
            variant="outlined"
            fullWidth
            margin="normal"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="auth-dialog__actions">
          <Button
            variant="contained"
            onClick={handle2FASubmit}
            className="auth-dialog__submit-button"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
