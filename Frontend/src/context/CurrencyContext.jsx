import {

  createContext,
  useContext,
  useState,

} from "react";

const CurrencyContext =
  createContext();

export const CurrencyProvider = ({
  children,
}) => {

  // CURRENCY
  const [currency, setCurrency] =
    useState("INR");

  // SYMBOLS
  const symbols = {

    INR: "₹",

    USD: "$",

    EUR: "€",

    GBP: "£",

  };

  // CONVERSION RATES
  const rates = {

    INR: 1,

    USD: 0.012,

    EUR: 0.011,

    GBP: 0.0095,

  };

  // CONVERT FUNCTION
  const convertAmount = (
    amount
  ) => {

    return (
      amount * rates[currency]
    ).toFixed(2);
  };

  return (

    <CurrencyContext.Provider
      value={{

        currency,

        setCurrency,

        symbols,

        convertAmount,

      }}
    >

      {children}

    </CurrencyContext.Provider>
  );
};

export const useCurrency = () =>
  useContext(CurrencyContext);