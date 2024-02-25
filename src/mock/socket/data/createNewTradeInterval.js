import { random } from 'lodash';

import {
  dirtyAndImpreciseFloat,
  messageInterval,
  현재_내보유_전체,
} from '../../common';

const createNewTradeInterval = (ws, { type }) => {
  const intervalId = setInterval(() => {
    const targetIndex = random(0, 현재_내보유_전체.length - 1);
    const tradedItem = 현재_내보유_전체[targetIndex];

    const { name, country, amount } = tradedItem;

    let diffAmount =
      (country === 'KR'
        ? random(1, 10) * 10
        : parseFloat(random(1, 10, true).toFixed(4))) * [1, -1][random(0, 1)];

    if (diffAmount < 0 && Math.abs(diffAmount) > amount) {
      diffAmount = Math.abs(diffAmount);
    }

    const nextAmount = dirtyAndImpreciseFloat(amount + diffAmount);

    tradedItem.amount = nextAmount;

    ws.send(
      JSON.stringify({
        type,
        country,
        name,
        amount: nextAmount,
        responseAt: Date.now(),
      }),
    );
  }, messageInterval);

  return intervalId;
};

export default createNewTradeInterval;
