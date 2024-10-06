import axios from "axios";
// import { baseCurrencyUrl } from "./config";

export async function getExchangeRates() {
  try {
    const baseURL =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const response = await axios.get(`${baseURL}/api/exchange-rate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates from backend:", error);
    return null;
  }
}
