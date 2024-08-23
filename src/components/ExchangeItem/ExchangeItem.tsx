import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ExchangeItemProps {
  title: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
            borderRadius: "15px"
          },
        },
      },
    },
  });
  return (
    <div className="item">
      <p className="you-p">{title}:</p>
      <div className={"input-container"}>
        <input
          className={"input"}
          type="number"
          value={sumGive}
          onChange={handleInputChange}
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
