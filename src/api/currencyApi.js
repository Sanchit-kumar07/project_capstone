import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

export const getExchangeRates = async (baseCurrency = 'USD') => {
  const { data } = await axios.get(`${BASE_URL}/latest?from=${baseCurrency}`);
  return data;
};

export const convertCurrency = async (from, to, amount) => {
  const { data } = await axios.get(`${BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`);
  return data;
};

export const getSupportedCurrencies = async () => {
  const { data } = await axios.get(`${BASE_URL}/currencies`);
  return data;
};
