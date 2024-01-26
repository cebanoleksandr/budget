import axios from "axios";

const key = 'ae5a48e08b2c5e2e4a3d99de373771bf'

export const fetchCurrency = () => {
  return axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH,PLN`);
}
