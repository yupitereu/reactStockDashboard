import { useRealtimePriceSocket } from '../../../../service/dashboardService';
import { HoldingStock } from '../../../../types/stock';
import {
  currencyString,
  fixedLocaleNumber,
} from '../../../../uitls/textFormat';

export const MyStockRow = (props: { item: HoldingStock }) => {
  const {
    item: { name, country, amount, price, evaluationAmount },
  } = props;
  useRealtimePriceSocket(country, name);

  return (
    <tr className="flex w-full border-y border-black my-1">
      <td className="w-1/4 truncate">{name}</td>
      <td className="w-1/4">{fixedLocaleNumber(amount, 2)}</td>
      <td className="w-1/4">{currencyString(country, price)}</td>
      <td className="w-1/4">
        {country !== 'kr' && `≈ `}
        {currencyString('kr', evaluationAmount)}
      </td>
    </tr>
  );
};
