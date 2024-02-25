import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

import { COUNTRY } from '../../../../consts/category';
import { CountrySelector } from '../../../../designSystem/countrySelector';
import { CountryCode, CountryItem } from '../../../../types/category';
import { currencyString } from '../../../../uitls/textFormat';
import { PriceListErrorFallback } from '../priceLIstErrorFallback';
import { PriceListSuspense } from '../priceListSuspense';

import { MyStockList } from './myStockList';

export const MyStocks = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('all');
  const categoryItems: CountryItem[] = useMemo(
    () => [{ key: 'all', name: '전체' }, ...COUNTRY],
    [COUNTRY],
  );
  const [evaluationAmount, setEvaluationAmount] = useState(0);
  const { reset } = useQueryErrorResetBoundary();
  return (
    <section className="w-full border border-black m-1 py-2 px-4 overflow-hidden">
      <header>
        <h1 className="text-lg"> 내 보유 주식 </h1>
      </header>
      <div className="h-96">
        <aside className="my-1">
          <CountrySelector
            items={categoryItems}
            selectedItemKey={selectedCountry}
            onSelect={setSelectedCountry}
            wrapClassName={'flex justify-around bg-gray-300 rounded py-1'}
            itemClassNames={['w-full']}
          />
        </aside>
        <section className="bg-gray-100 rounded my-2 px-3 py-1 text-center">
          평가금액{(selectedCountry === 'kr' && ` `) || ' ≈ '}
          {currencyString('kr', evaluationAmount)}
        </section>
        <ErrorBoundary
          FallbackComponent={PriceListErrorFallback}
          onReset={reset}>
          <PriceListSuspense>
            <MyStockList
              selectedCountry={selectedCountry}
              onChangeTotalEvaluationAmount={setEvaluationAmount}
            />
          </PriceListSuspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};
