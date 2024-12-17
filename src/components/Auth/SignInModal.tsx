import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Checkbox, FormControlLabel } from "@mui/material";
import "./Auth.scss"; // Здесь ваш .scss, если нужен

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback после успешного входа
}

export default function SignInModal({ open, onClose, onSuccess }: SignInModalProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");
  const [has2FA, setHas2FA] = useState(false); 
  // Допустим, мы заранее не знаем, есть ли у пользователя 2FA.
  // В реальном сценарии это обычно приходит с бэкенда при попытке входа.

  const handleSubmit = () => {
    // Валидация полей (простейший вариант)
    if (!login.trim() || !password.trim()) {
      alert("Логин и пароль обязательны.");
      return;
    }

    // Если у пользователя 2FA включена, проверяем поле twoFA
    if (has2FA && !twoFA.trim()) {
      alert("Необходимо ввести код двухфакторной аутентификации.");
      return;
    }

    // Здесь делаем реальный запрос на бэкенд (fetch/axios), передаём login, password, twoFA...
    // Если всё ок — выполняем onSuccess, чтобы закрыть модал и перейти в личный кабинет
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Вход в систему</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {has2FA && (
          <TextField
            label="2FA код"
            variant="outlined"
            fullWidth
            margin="normal"
            value={twoFA}
            onChange={(e) => setTwoFA(e.target.value)}
          />
        )}

        {/* Чекбокс для примера (захотим ли включать 2FA в следующий раз или определить, включено ли) */}
        <FormControlLabel
          control={
            <Checkbox
              checked={has2FA}
              onChange={(e) => setHas2FA(e.target.checked)}
              color="primary"
            />
          }
          label="Включена двухфакторная аутентификация?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
