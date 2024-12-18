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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!login.trim() || !password.trim()) {
      alert("Логин и пароль обязательны.");
      return;
    }

    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} className="auth-dialog">
      <DialogTitle className="auth-dialog__title">Авторизация</DialogTitle>
      <DialogContent dividers className="auth-dialog__content">
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Логин или e-mail</div>
          <TextField
            placeholder="Логин или e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
        {/* Убрали кнопку отмены, оставляем только "Войти" */}
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
