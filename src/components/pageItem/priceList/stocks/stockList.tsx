import { useEffect, useRef, useState } from 'react';

import {
  useClosedPriceQuery,
  useRealtimePriceQuery,
} from '../../../../service/dashboardService';
import { CountryCode } from '../../../../types/category';
import { RealtimeStockPrice } from '../../../../types/stock';
import { mergeSort } from '../../../../uitls/sort';

import { StockRow } from './stockRow';

export const StockList = (props: { selectedCountry: CountryCode }) => {
  const { data: realtimeItems, isFetching: realtimeItemIsFetching } =
    useRealtimePriceQuery(props.selectedCountry);
  const { data: closedItems, isFetching: closedItemIsFetching } =
    useClosedPriceQuery(props.selectedCountry);
  const [sortedItems, setSortedItems] = useState<RealtimeStockPrice[]>([]);
  const sortedItemsCountry = useRef<CountryCode>(props.selectedCountry);

  const initItems = () => {
    if (!realtimeItems?.data || !closedItems?.data) return [];

    sortedItemsCountry.current = props.selectedCountry;
    const convertedItems = realtimeItems.data.map((item, index) => {
      const closedItem =
        item.name === closedItems.data[index].name
          ? closedItems.data[index]
          : closedItems.data.find(value => value.name === item.name) ?? {
              name: item.name,
              price: 0,
              closedPrice: 0,
            };
      const closedPrice = closedItem.closedPrice ?? closedItem.price ?? 0;
      const difference = Math.round((item.price - closedPrice) * 100) / 100;
      const changeRate =
        Math.round((difference / closedPrice) * 100 * 100) / 100;

      return {
        name: item.name,
        price: item.price,
        closedPrice,
        difference,
        changeRate,
      };
    });

    return mergeSort(
      convertedItems,
      'changeRate',
    ).reverse() as RealtimeStockPrice[];
  };

  useEffect(() => {
    if (
      !realtimeItems ||
      !closedItems ||
      realtimeItemIsFetching ||
      closedItemIsFetching
    ) {
      setSortedItems([]);
      return;
    }

    if (
      !sortedItems.length ||
      sortedItemsCountry.current !== props.selectedCountry
    ) {
      setSortedItems(initItems());
    }
  }, [
    realtimeItems,
    closedItems,
    realtimeItemIsFetching,
    closedItemIsFetching,
  ]);

  return (
    <div className="h-96 overflow-auto">
      <ul>
        {sortedItems.map(item => (
          <StockRow
            key={item.name}
            item={item}
            countryCode={sortedItemsCountry.current}
          />
        ))}
      </ul>
    </div>
  );
};
