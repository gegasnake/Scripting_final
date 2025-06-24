import { currencyRates } from "../CurrencyContext";

export function formatPrice(price, currency) {
  const { symbol, rate } = currencyRates[currency];
  return `${symbol}${(price * rate).toFixed(2)}`;
}