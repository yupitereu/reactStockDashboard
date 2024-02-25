import { CountryCode } from '../types/category';

export const fixedLocaleNumber = (data: number, fractionDigits: number) =>
  parseFloat(data.toFixed(fractionDigits)).toLocaleString();

export const currencyString = (
  countryCode: Omit<CountryCode, 'all'>,
  price: number,
) => {
  if (countryCode === 'kr') {
    return `${fixedLocaleNumber(price, 0)}원`;
  } else {
    return `$${fixedLocaleNumber(price, 4)}`;
  }
};
