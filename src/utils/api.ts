import axios from "axios";
// import { baseCurrencyUrl } from "./config";

const baseURL =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export async function getExchangeRates() {
  try {
    
    const response = await axios.get(`${baseURL}/api/exchange-rate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates from backend:", error);
    return null;
  }
}

export const calculateExchange = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  try {
    const response = await axios.post(`${baseURL}/api/get-rate`, {
      fromCurrency,
      toCurrency,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе расчета:", error);
    return null;
  }
};