import { random } from 'lodash';

import {
  dirtyAndImpreciseFloat,
  messageInterval,
  미국_지원종목_가격,
  미국_지원종목명_인덱스,
  한국_지원종목_가격,
  한국_지원종목명_인덱스,
} from '../../common';

const createPriceInterval = (ws, { type, country, name }) => {
  const intervalId = setInterval(() => {
    const targetPriceObject =
      country === 'KR' ? 한국_지원종목_가격 : 미국_지원종목_가격;
    const targetIndexObject =
      country === 'KR' ? 한국_지원종목명_인덱스 : 미국_지원종목명_인덱스;

    const currentPrice = targetPriceObject[targetIndexObject[name]].price;
    let diffPrice =
      (country === 'KR'
        ? random(1, 10) * 10
        : parseFloat(random(1, 10, true).toFixed(4))) * [1, -1][random(0, 1)];

    if (diffPrice < 0 && Math.abs(diffPrice) > currentPrice) {
      diffPrice = Math.abs(diffPrice);
    }

    const nextPrice = dirtyAndImpreciseFloat(currentPrice + diffPrice);

    targetPriceObject[targetIndexObject[name]].price = nextPrice;

    ws.send(
      JSON.stringify({
        type,
        country,
        name,
        price: nextPrice,
        responseAt: Date.now(),
      }),
    );
  }, messageInterval);

  return intervalId;
};

export default createPriceInterval;
