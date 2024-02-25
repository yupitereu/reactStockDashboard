import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

import { COUNTRY } from '../../../../consts/category';
import { CountrySelector } from '../../../../designSystem/countrySelector';
import { CountryCode } from '../../../../types/category';
import { PriceListErrorFallback } from '../priceLIstErrorFallback';
import { PriceListSuspense } from '../priceListSuspense';

import { StockList } from './stockList';

export const Stocks = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('kr');
  const { reset } = useQueryErrorResetBoundary();
  return (
    <section className="w-full border border-black m-1 py-2 px-4">
      <header className="flex justify-between items-center">
        <h1 className="text-lg"> 종목별 시세 </h1>
        <CountrySelector
          items={COUNTRY}
          selectedItemKey={selectedCountry}
          onSelect={setSelectedCountry}
          wrapClassName={'bg-gray-200 px-1 py-1 rounded'}
        />
      </header>
      <hr className="border-black my-2" />
      <ErrorBoundary FallbackComponent={PriceListErrorFallback} onReset={reset}>
        <PriceListSuspense>
          <StockList selectedCountry={selectedCountry} />
        </PriceListSuspense>
      </ErrorBoundary>
    </section>
  );
};
