import { random } from 'lodash';

import {
  dirtyAndImpreciseFloat,
  messageInterval,
  현재_공통정보,
} from '../../common';

const createPriceInterval = (ws, { type }) => {
  const intervalId = setInterval(() => {
    const currentRate = 현재_공통정보.환율;
    const nextRate = dirtyAndImpreciseFloat(
      currentRate +
        parseFloat(random(1, 100, true).toFixed(2) * [1, -1][random(0, 1)]),
    );

    ws.send(
      JSON.stringify({
        type,
        rate: nextRate,
        responseAt: Date.now(),
      }),
    );
  }, messageInterval);

  return intervalId;
};

export default createPriceInterval;
