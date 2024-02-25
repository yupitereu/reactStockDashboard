import { useEffect, useMemo } from 'react';

import {
  useMyStocksQuery,
  useNewTradeSocket,
  useRateQuery,
} from '../../../../service/dashboardService';
import { CountryCode } from '../../../../types/category';
import { MyStocksResponse } from '../../../../types/dashboardServerResponse';
import { HoldingStock } from '../../../../types/stock';
import { useRealtimeStocksContext } from '../realtimeStocksProvider';

import { MyStockRow } from './myStockRow';

export const MyStockList = (props: MyStockListProps) => {
  const { data: myStocks } = useMyStocksQuery(props.selectedCountry);
  const { data: rate } = useRateQuery();
  const { stockData, newTradeData } = useRealtimeStocksContext();
  useNewTradeSocket(props.selectedCountry);

  const calculateEvaluationAmount = (item: MyStocksResponse) => {
    const itemPrice = stockData[item.name] ?? item.price;
    const itemAmount = newTradeData[item.name]?.amount ?? item.amount;
    return itemAmount * itemPrice * ((item.country === 'US' && rate) || 1);
  };

  const items: HoldingStock[] = useMemo(() => {
    return (
      myStocks?.map(item => {
        return {
          ...item,
          amount: newTradeData[item.name]?.amount ?? item.amount,
          price: stockData[item.name] ?? item.price,
          country: item.country.toLowerCase(),
          evaluationAmount: calculateEvaluationAmount(item),
        };
      }) ?? []
    );
  }, [myStocks, rate]);

  // [{ name: 'AT&T', evaluationAmount: 1000 }];
  const totalEvaluationAmount = useMemo(() => {
    return items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.evaluationAmount,
      0,
    );
  }, [items]);

  useEffect(() => {
    props.onChangeTotalEvaluationAmount &&
      props.onChangeTotalEvaluationAmount(totalEvaluationAmount);
  }, [totalEvaluationAmount]);
  return (
    <table className="w-full">
      <thead className="flex w-full">
        <tr className="flex w-full">
          <th className="w-1/4"> 종목명</th>
          <th className="w-1/4"> 보유수량</th>
          <th className="w-1/4"> 현재가</th>
          <th className="w-1/4"> 평가금액</th>
        </tr>
      </thead>
      <tbody
        className="overflow-y-scroll text-center flex flex-col w-full item-center justify-between"
        style={{ height: '300px' }}>
        {items.map(item => (
          <MyStockRow key={item.name} item={item} />
        ))}
      </tbody>
    </table>
  );
};

type MyStockListProps = {
  selectedCountry: CountryCode;
  onChangeTotalEvaluationAmount?: (amount: number) => void;
};
