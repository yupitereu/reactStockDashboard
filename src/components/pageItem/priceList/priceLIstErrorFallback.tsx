import { FallbackProps } from 'react-error-boundary/dist/declarations/src/types';

export const PriceListErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div className="w-full h-80 flex align-center justify-center">
      <div className="inner">
        <h2 className="title">오류가 발생하였습니다.</h2>
        <button type="button" onClick={resetErrorBoundary}>
          다시시도
        </button>
      </div>
    </div>
  );
};

type ErrorFallbackProps = FallbackProps;
