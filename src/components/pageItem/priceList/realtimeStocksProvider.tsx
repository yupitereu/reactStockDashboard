import { createContext, ReactNode, useContext, useState } from 'react';

import { NewTradeSocketResponse } from '../../../types/dashboardServerResponse';

const RealtimeStockContext = createContext<RealtimeStocksProviderData>({
  stockData: {},
  newTradeData: {},
});

export const useRealtimeStocksContext = () => {
  return useContext(RealtimeStockContext);
};

export const RealtimeStocksProvider = (props: RealtimeStocksProviderProps) => {
  const { children } = props;
  const [newTradeData, setNewTradeData] = useState<
    Record<string, NewTradeSocketResponse>
  >({});
  const [stockPricesData, setStockPricesData] = useState<
    Record<string, number>
  >({});

  const updateStockPricesData = (name: string, value: number) => {
    setStockPricesData(prevState => {
      prevState[name] = value;
      return { ...prevState };
    });
  };

  const updateNewTradeData = (name: string, value: NewTradeSocketResponse) => {
    setNewTradeData(prevState => {
      prevState[name] = value;
      return { ...prevState };
    });
  };

  return (
    <RealtimeStockContext.Provider
      value={{
        stockData: stockPricesData,
        updateStockPricesData,
        newTradeData,
        updateNewTradeData,
      }}>
      {children}
    </RealtimeStockContext.Provider>
  );
};

interface RealtimeStocksProviderProps {
  children: ReactNode;
}

type RealtimeStocksProviderData = {
  stockData: Record<string, number>;
  updateStockPricesData?: (name: string, value: number) => void;
  newTradeData: Record<string, NewTradeSocketResponse>;
  updateNewTradeData?: (name: string, value: NewTradeSocketResponse) => void;
};
