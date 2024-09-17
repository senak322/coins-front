import axios from "axios";
import { baseCurrencyUrl } from "./config";

export async function getExchangeRate(
  sendCurrency: string,
  receiveCurrency: string
) {
  try {
    const toLowerSend = sendCurrency.toLowerCase();
    const toLowerReceive = receiveCurrency.toLowerCase();
    const response = await axios.get(`${baseCurrencyUrl + toLowerSend}.json`);
    const rate = response.data[toLowerSend][toLowerReceive];
    return rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}