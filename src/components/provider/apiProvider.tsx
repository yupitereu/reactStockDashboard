import { createContext, ReactNode, useContext } from 'react';
import { AxiosInstance } from 'axios';

import { API } from '../../uitls/network';

const ApiClientContext = createContext<AxiosInstance>(API);

export const useApiClient = () => {
  return useContext(ApiClientContext);
};

export const ApiProvider = (props: ApiProviderProps) => {
  const { children } = props;

  return (
    <ApiClientContext.Provider value={API}>
      {children}
    </ApiClientContext.Provider>
  );
};

interface ApiProviderProps {
  children: ReactNode;
}
