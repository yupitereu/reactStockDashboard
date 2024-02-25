import {
  useInfoQuery,
  useInfoSocket,
  useRateQuery,
  useRateSocket,
} from '../../../service/dashboardService';
import { fixedLocaleNumber } from '../../../uitls/textFormat';

export const Header = () => {
  const { data: info } = useInfoQuery();
  const { data: rate } = useRateQuery();

  useInfoSocket('KR');
  useInfoSocket('US');
  useRateSocket();

  return (
    <header className="flex justify-between border border-black m-1 px-1 py-2">
      <div className="flex">
        <span className="bg-gray-100 rounded px-2 text-sm">
          실시간 시장 정보
        </span>
        {info && (
          <>
            <span className="text-sm mx-2">
              미국 {fixedLocaleNumber(info.US, 2)}
            </span>
            <span className="text-sm mx-2">
              한국 {fixedLocaleNumber(info.KR, 2)}
            </span>
          </>
        )}
      </div>
      {rate && (
        <div className="flex">
          <span className="bg-gray-100 rounded px-2 text-sm">실시간 환율</span>
          <span className="text-sm mx-2">
            1$ = {fixedLocaleNumber(rate, 2)}원
          </span>
        </div>
      )}
    </header>
  );
};
