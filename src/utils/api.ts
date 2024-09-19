import axios from "axios";
// import { baseCurrencyUrl } from "./config";

const API_KEY = process.env.API_KEY;

export async function getExchangeRate(
  sendCurrency: string,
  receiveCurrency: string
) {
  try {
    // Создаем карту для преобразования пользовательских символов в стандартные
    const symbolMap: { [key: string]: string } = {
      "Sber": "RUB",
      "T-Bank": "RUB",
      
    };

    const sendSymbol = symbolMap[sendCurrency] || sendCurrency.toUpperCase();
    const receiveSymbol =
      symbolMap[receiveCurrency] || receiveCurrency.toUpperCase();

    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/price",
      {
        params: {
          fsym: sendSymbol,
          tsyms: receiveSymbol,
        },
        headers: {
          authorization: `Apikey ${API_KEY}`,
        },
      }
    );

    const rate = response.data[receiveSymbol];
    return rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
}
