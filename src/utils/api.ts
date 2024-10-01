import axios from "axios";
// import { baseCurrencyUrl } from "./config";



export async function getExchangeRates() {
  try {
    const response = await axios.get('http://localhost:5000/api/exchange-rate');
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates from backend:', error);
    return null;
  }
}