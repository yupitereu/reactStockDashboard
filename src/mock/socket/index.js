import { Server } from 'mock-socket';

import createInfoInterval from './data/createInfoInterval';
import createNewTradeInterval from './data/createNewTradeInterval';
import createPriceInterval from './data/createPriceInterval';
import createRateInterval from './data/createRateInterval';

const enableMockSocket = () => {
  const mockServer = new Server('ws://localhost:3000/socket');

  const intervalMap = {};

  mockServer.on('connection', ws => {
    Object.values(intervalMap).forEach(interval => clearInterval(interval));

    ws.on('message', message => {
      if (!message) {
        return;
      }

      if (!message.guid) {
        return;
      }

      const intervalKey = `${message.guid}`;

      switch (message.command) {
        case 'UNSUBSCRIBE': {
          if (intervalKey in intervalMap) {
            clearInterval(intervalMap[intervalKey]);
            delete intervalMap[intervalKey];
          }
          break;
        }
        case 'SUBSCRIBE': {
          if (intervalKey in intervalMap) {
            return;
          }

          switch (message.type) {
            case 'PRICE': {
              intervalMap[intervalKey] = createPriceInterval(ws, message);
              break;
            }
            case 'RATE': {
              intervalMap[intervalKey] = createRateInterval(ws, message);
              break;
            }
            case 'INFO': {
              intervalMap[intervalKey] = createInfoInterval(ws, message);
              break;
            }
            case 'NEW_TRADE': {
              intervalMap[intervalKey] = createNewTradeInterval(ws, message);
              break;
            }
            default: {
              return;
            }
          }

          break;
        }
        default: {
          return;
        }
      }
    });
  });
};

export default enableMockSocket;
