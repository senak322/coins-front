import {
  MenuItem,
  Select,
  FormControl,
  
  SelectChangeEvent,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./ExchangeItem.scss";
import { currencies } from "../../utils/config";

interface ExchangeItemProps {
  title: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (e: SelectChangeEvent<string>) => void;
}

export default function ExchangeItem({
  title,
  handleInputChange,
  handleCurrencyChange,
}: ExchangeItemProps) {
  const { instances, sumGive, sumReceive } = useSelector(
    (state: RootState) => state.exchange
  );
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
          <FormControl>
            <Select
              displayEmpty
              value={instances.give.selectedCurrency}
              onChange={handleCurrencyChange}
              label="Currency"
              className="custom-select"
              renderValue={(value) => (
                <div className="selected-item">
                  <img
                    src={
                      currencies.find((currency) => currency.symbol === value)
                        ?.icon
                    }
                    alt={value}
                    className="currency-icon"
                  />
                  {value}
                </div>
              )}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.symbol} value={currency.symbol}>
                  <div className="menu-item">
                    <img
                      src={currency.icon}
                      alt={currency.symbol}
                      className="currency-icon"
                    />
                    {currency.symbol}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
