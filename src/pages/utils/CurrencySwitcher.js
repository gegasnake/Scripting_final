import { useCurrency } from "./CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  return (
    <select value={currency} onChange={e => setCurrency(e.target.value)}>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
      <option value="JPY">¥ JPY</option>
    </select>
  );
}