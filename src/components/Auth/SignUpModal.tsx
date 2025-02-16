import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { register } from "../../services/authAPI"; // Подключаем API
import "./Auth.scss";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignUpModal({ open, onClose, onSuccess }: SignUpModalProps) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreeRules, setAgreeRules] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!login.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("Все поля обязательны для заполнения.");
      return;
    }

    if (password !== confirm) {
      setError("Пароли не совпадают.");
      return;
    }

    if (!agreeRules) {
      setError("Необходимо согласиться с правилами сервиса.");
      return;
    }
    // Извлекаем реферальный код из sessionStorage, если он там есть
    const referralCode = sessionStorage.getItem("referralCode") || "";

    try {
      const { message } = await register(login, email, password, referralCode ); // API запрос
      alert(message); // Уведомление о успешной регистрации
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Ошибка регистрации.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="auth-dialog">
      <DialogTitle className="auth-dialog__title">Регистрация</DialogTitle>
      <DialogContent dividers className="auth-dialog__content">
        {error && <div className="auth-dialog__error">{error}</div>}
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Логин</div>
          <TextField
            placeholder="Введите логин"
            variant="outlined"
            fullWidth
            margin="normal"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">E-mail</div>
          <TextField
            placeholder="Введите E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Пароль</div>
          <TextField
            placeholder="Введите пароль"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-dialog__field">
          <div className="auth-dialog__field-label">Пароль снова</div>
          <TextField
            placeholder="Введите пароль повторно"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeRules}
              onChange={(e) => setAgreeRules(e.target.checked)}
              color="primary"
            />
          }
          label={
            <>
              С{" "}
              <Link href="/rules" target="_blank" className="auth-dialog__link">
                правилами сервиса
              </Link>{" "}
              ознакомлен и согласен.
            </>
          }
        />
      </DialogContent>
      <DialogActions className="auth-dialog__actions">
        <Button variant="contained" onClick={handleSubmit} className="auth-dialog__submit-button">
          Регистрация
        </Button>
      </DialogActions>
    </Dialog>
  );
}
