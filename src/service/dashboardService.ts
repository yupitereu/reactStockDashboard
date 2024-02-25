import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { format } from 'date-fns';

import { useRealtimeStocksContext } from '../components/pageItem/priceList/realtimeStocksProvider';
import { useApiClient } from '../components/provider/apiProvider';
import { useSocket } from '../components/provider/socketProvider';
import { CountryCode } from '../types/category';
import {
  InfoApiResponse,
  InfoSocketResponse,
  MyStocksResponse,
  NewTradeSocketResponse,
  RateSocketResponse,
  StockPriceSocketResponse,
} from '../types/dashboardServerResponse';
import { ClosedPrice, StockPrice } from '../types/stock';
import { subscribeSocket } from '../uitls/network';

/**
 * Heaer의 실시간 시장 정보
 */
export const useInfoQuery = () => {
  const API = useApiClient();
  return useQuery(['info'], async () => {
    const { data } = await API.get<InfoApiResponse>('/info');

    return data;
  });
};

export const useInfoSocket = (countryCode: InfoSocketResponse['country']) => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    return subscribeSocket(
      socket,
      {
        guid: `global-unique-id-${countryCode === 'KR' ? 4 : 5}`,
        type: 'INFO',
        country: countryCode,
      },
      (receiveData: InfoSocketResponse) => {
        if (countryCode !== receiveData.country) return;
        queryClient.setQueryData(['info'], () => {
          const info: InfoApiResponse = queryClient.getQueryData(['info']) ?? {
            KR: 0,
            US: 0,
          };

          if (info) {
            info[receiveData.country] = receiveData.rate;
          }

          return info;
        });
      },
    );
  }, [socket]);
};

/**
 * Header의 실시간 환욜
 */
export const useRateQuery = () => {
  const API = useApiClient();
  return useQuery(['rate'], async () => {
    const { data } = await API.get<number>('/rate');

    return data;
  });
};

export const useRateSocket = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    return subscribeSocket(
      socket,
      {
        guid: 'global-unique-id-3',
        type: 'RATE',
      },
      (receiveData: RateSocketResponse) =>
        queryClient.setQueryData(['rate'], () => {
          return receiveData.rate;
        }),
    );
  }, [socket]);
};

export const useRealtimePriceQuery = (
  countryCode: Omit<CountryCode, 'all'>,
) => {
  const API = useApiClient();
  return useQuery(
    ['stock-price', countryCode],
    () => {
      return API.get<StockPrice[]>(`/stock-price/${countryCode}`);
    },
    {
      structuralSharing: false,
      suspense: true,
      keepPreviousData: false,
    },
  );
};

export const useClosedPriceQuery = (countryCode: Omit<CountryCode, 'all'>) => {
  const API = useApiClient();
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  return useQuery(
    ['closed-price', todayDate, countryCode],
    () => {
      return API.get<ClosedPrice[]>(`/closed-price/${countryCode}`);
    },
    { suspense: true },
  );
};

export const useRealtimePriceSocket = (
  countryCode: Omit<CountryCode, 'all'>,
  name: string,
) => {
  const socket = useSocket();
  const { updateStockPricesData } = useRealtimeStocksContext();
  useEffect(() => {
    return subscribeSocket(
      socket,
      {
        guid: `global-unique-id-${countryCode === 'kr' ? 1 : 2}-${name}`,
        type: 'PRICE',
        country: countryCode.toUpperCase(),
        name,
      },
      (receiveData: StockPriceSocketResponse) => {
        if (updateStockPricesData && name === receiveData.name) {
          updateStockPricesData(receiveData.name, receiveData.price);
        }
      },
    );
  }, [socket, countryCode]);
};

export const useMyStocksQuery = (countryCode: CountryCode) => {
  const API = useApiClient();
  const requestPath =
    countryCode === 'all' ? '/assets' : `assets/${countryCode}`;
  return useQuery(
    ['myStock', countryCode],
    async () => {
      const { data } = await API.get<MyStocksResponse[]>(requestPath);

      return data;
    },
    {
      suspense: true,
      keepPreviousData: false,
      useErrorBoundary: true,
    },
  );
};

export const useNewTradeSocket = (countryCode: CountryCode) => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const { updateNewTradeData } = useRealtimeStocksContext();
  useEffect(() => {
    return subscribeSocket(
      socket,
      {
        guid: 'global-unique-id-6',
        type: 'NEW_TRADE',
      },
      (receiveData: NewTradeSocketResponse) => {
        const cachedStocks: MyStocksResponse[] =
          queryClient.getQueryData(['myStock', countryCode]) ?? [];
        if (!cachedStocks.find(stock => stock.name === receiveData.name)) {
          queryClient.invalidateQueries(['myStock', countryCode]);
        }
        updateNewTradeData && updateNewTradeData(receiveData.name, receiveData);
      },
    );
  }, [socket, countryCode]);
};
