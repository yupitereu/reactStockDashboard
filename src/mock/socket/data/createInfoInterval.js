import { random } from 'lodash';

import {
  dirtyAndImpreciseFloat,
  messageInterval,
  현재_공통정보,
} from '../../common';

const createPriceInterval = (ws, { type, country }) => {
  const intervalId = setInterval(() => {
    const currentValue =
      country === 'KR' ? 현재_공통정보.한국시장 : 현재_공통정보.미국시장;
    const nextValue = dirtyAndImpreciseFloat(
      currentValue + random(1, 10) * [1, -1][random(0, 1)],
    );

    ws.send(
      JSON.stringify({
        type,
        country,
        rate: nextValue,
        responseAt: Date.now(),
      }),
    );
  }, messageInterval);

  return intervalId;
};

export default createPriceInterval;
