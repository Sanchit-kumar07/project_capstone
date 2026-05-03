import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  const { data } = await axios.get(`${BASE_URL}/all?fields=name,capital,region,population,flags,cca3,currencies,languages,latlng,area`);
  return data;
};

export const getCountryByCode = async (code) => {
  const { data } = await axios.get(`${BASE_URL}/alpha/${code}`);
  return data;
};

export const getCountriesByRegion = async (region) => {
  const { data } = await axios.get(`${BASE_URL}/region/${region}?fields=name,capital,region,population,flags,cca3,currencies,languages`);
  return data;
};

export const getCountriesByCodes = async (codes) => {
  if (!codes || codes.length === 0) return [];
  const { data } = await axios.get(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3,flags`);
  return data;
};
