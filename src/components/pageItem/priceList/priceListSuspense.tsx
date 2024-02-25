import { ReactNode, Suspense } from 'react';

export const PriceListSuspense = (props: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className={'w-full h-80 flex items-center justify-center'}>
        <span className={'loader'} />
      </div>
    }>
    {props.children}
  </Suspense>
);
