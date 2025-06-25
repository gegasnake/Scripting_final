import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const currencyRates = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.93 },
  JPY: { symbol: "¥", rate: 158.5 }, 
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}