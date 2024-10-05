export interface ICurrency {
  symbol: string;
  icon: string;
  isBank: boolean;
  decimalPlaces: number;
}

export interface IOrder {
  orderId: string;
  amountGive: number;
  currencyGive: string;
  amountReceive: number;
  currencyReceive: string;
  telegramNickname: string;
  createdAt: string;
}
