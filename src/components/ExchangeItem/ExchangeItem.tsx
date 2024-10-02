import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCallback } from "react";
import { setInputError } from "../../store/exchangeSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface ExchangeItemProps {
  title: string;
  handleInputChange: (value: string) => void;
  handleCurrencyChange: (e: SelectChangeEvent<string>) => void;
  way: string;
}

export default function ExchangeItem({
  title,
  handleInputChange,
  handleCurrencyChange,
  way,
}: ExchangeItemProps) {
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );
  const dispatch = useAppDispatch();

  const handleChangeSum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      // const isSelectedCurrencyBank = instances[way].isBank;
      const errText = "Укажите корректную сумму";

      // Получаем выбранную валюту
      const selectedCurrency = instances[way].currencies.find(
        (c) => c.symbol === instances[way].selectedCurrency
      );

      const allowedDecimalPlaces = selectedCurrency?.decimalPlaces ?? 8; // По умолчанию 8

      const regex =
        allowedDecimalPlaces === 0
          ? /^\d*$/
          : new RegExp(`^\\d*(?:[.,]\\d{0,${allowedDecimalPlaces}})?$`);

      if (!regex.test(value)) {
        dispatch(setInputError({ instanceId: way, message: errText }));
        return; // Если значение не соответствует правилам ввода, не обновляем состояние
      }

      value = value.replace(",", ".");

      dispatch(setInputError({ instanceId: way, message: "" })); // Сбрасываем ошибку
      handleInputChange(value); // Передаем строковое значение
    },
    [handleInputChange, instances, way, dispatch]
  );

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: "0px", // Убираем padding
          },
        },
      },
    },
  });

  return (
    <div className="item">
      <p className="you-p">{title}:</p>
      <div className="input-container">
        <input
        placeholder="Укажите сумму"
          className="input"
          type="text"
          value={way === "give" ? sumGive : sumReceive || ""}
          onChange={handleChangeSum}
          style={{
            paddingLeft: "10px",
          }}
        />
        <div className={"input"}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <Select
                displayEmpty
                value={instances[way].selectedCurrency}
                onChange={handleCurrencyChange}
                label="Currency"
                className="custom-select"
                renderValue={(value) => (
                  <div className="selected-item">
                    {value}
                    <img
                      src={
                        instances[way].currencies.find(
                          (currency) => currency.symbol === value
                        )?.icon
                      }
                      alt={value}
                      className="currency-icon"
                    />
                  </div>
                )}
              >
                {instances[way].currencies.map((currency) => (
                  <MenuItem key={currency.symbol} value={currency.symbol}>
                    <div className="menu-item">
                      {currency.symbol}
                      <img
                        src={currency.icon}
                        alt={currency.symbol}
                        className="currency-icon"
                      />
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
