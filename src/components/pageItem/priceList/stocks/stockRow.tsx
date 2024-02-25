import classNames from 'classnames';

import { useRealtimePriceSocket } from '../../../../service/dashboardService';
import { CountryCode } from '../../../../types/category';
import { RealtimeStockPrice } from '../../../../types/stock';
import {
  currencyString,
  fixedLocaleNumber,
} from '../../../../uitls/textFormat';
import { useRealtimeStocksContext } from '../realtimeStocksProvider';

export const StockRow = (props: {
  item: RealtimeStockPrice;
  countryCode: CountryCode;
}) => {
  const {
    item: { name, price, difference: initialDifference, closedPrice },
    countryCode,
  } = props;
  const { stockData } = useRealtimeStocksContext();
  const currentPrice = stockData[name] ?? price;
  const difference = stockData[name]
    ? stockData[name] - closedPrice
    : initialDifference;
  const changeRate = Math.round((difference / closedPrice) * 100 * 100) / 100;

  const changRateColor: 'red' | 'blue' | 'gray' =
    changeRate > 0 ? 'red' : changeRate < 0 ? 'blue' : 'gray';
  const differenceString =
    changeRate !== 0
      ? ` (${fixedLocaleNumber(difference, countryCode === 'us' ? 2 : 0)})`
      : '';
  useRealtimePriceSocket(countryCode, name);

  return (
    <li className="flex justify-between my-1 py-1 border-y border-black">
      <div>{name}</div>
      <div
        className={classNames(
          'w-2/4',
          'text-center',
          'flex',
          'justify-between',
          'px-2',
          {
            'bg-red-100': changRateColor === 'red',
            'bg-blue-100': changRateColor === 'blue',
            'bg-gray-100': changRateColor === 'gray',
          },
        )}>
        <span className="font-bold mx-1">
          {currencyString(countryCode, currentPrice)}
        </span>
        <span
          className={classNames({
            'text-red-900': changRateColor === 'red',
            'text-blue-900': changRateColor === 'blue',
            'text-gray-900': changRateColor === 'gray',
          })}>
          {changeRate > 0 && '+'}
          {changeRate}%{differenceString}
        </span>
      </div>
    </li>
  );
};
