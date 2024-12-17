import  { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";

import "./Auth.scss";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback при успешной регистрации
}

export default function SignUpModal({ open, onClose, onSuccess }: SignUpModalProps) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreeRules, setAgreeRules] = useState(false);

  const handleSubmit = () => {
    // Простейшая валидация
    if (!login.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      alert("Все поля со звездочкой обязательны для заполнения.");
      return;
    }

    if (password !== confirm) {
      alert("Пароли не совпадают!");
      return;
    }

    if (!agreeRules) {
      alert("Необходимо согласиться с правилами сервиса.");
      return;
    }

    // Здесь вызываем регистрацию (запрос к бэкенду). 
    // После удачного ответа, вызываем onSuccess().
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Логин *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <TextField
          label="E-mail *"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Пароль *"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Пароль снова *"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

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
              С <Link href="/rules" target="_blank">правилами сервиса</Link> ознакомлен и согласен.
            </>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
      </DialogActions>
    </Dialog>
  );
}
