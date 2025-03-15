import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { verifyEmail } from "../../services/authAPI"; // API вызов для верификации e-mail
import "./Auth.scss";

interface VerifyEmailModalProps {
  open: boolean;
  email: string; // e-mail, на который отправлен код
  onClose: () => void;
  onVerified: () => void;
}

export default function VerifyEmailModal({
  open,
  email,
  onClose,
  onVerified,
}: VerifyEmailModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Пожалуйста, введите код подтверждения");
      return;
    }
    try {
      // Отправляем e-mail и код на сервер для проверки
      await verifyEmail(email, code);
      onVerified();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Ошибка проверки кода");
    }
  };

  return (
    <Dialog className="auth-dialog" open={open} onClose={onClose}>
      <DialogTitle className="auth-dialog__title">
        Подтверждение e-mail
      </DialogTitle>
      <DialogContent dividers className="auth-dialog__content">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <p>
          На адрес <strong>{email}</strong> отправлен код подтверждения. Введите
          его ниже:
        </p>
        <div style={{marginTop: "1rem"}}>
          <div className="auth-dialog__field-label">Код подтверждения</div>
          <TextField
            //   label="Код подтверждения"
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="auth-dialog__submit-button" variant="contained" onClick={handleSubmit}>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
