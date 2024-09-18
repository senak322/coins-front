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

  const handleChangeSum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      const isSelectedCurrencyBank = instances[way].isBank;

      const regex = isSelectedCurrencyBank
        ? /^\d*$/ // Для банковских валют — только целые числа
        : /^[0-9]*[.,]?[0-9]*$/; // Для криптовалют — разрешаем дробные значения

      if (!regex.test(value)) {
        return; // Если значение не соответствует правилам ввода, не обновляем состояние
      }

      if (!isSelectedCurrencyBank) {
        value = value.replace(",", ".");
      }

      handleInputChange(value); // Передаем строковое значение
    },
    [handleInputChange, instances, way]
  );

  return (
    <div className="item">
      <p className="you-p">{title}:</p>
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={way === "give" ? sumGive : sumReceive}
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
