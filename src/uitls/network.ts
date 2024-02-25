import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { MessageHandler, SocketRequest } from '../types/network';

const requestCountByGuid: Record<string, number> = {};
const messageHandlers: Record<string, MessageHandler[]> = {};
let isSocketEventSubscribed = false;

export const createApiClient = (axiosConfig?: AxiosRequestConfig) => {
  const client = axios.create(axiosConfig);
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    error => {
      console.error(error);
      throw error;
    },
  );
  return client;
};

const handleOnSocketMessage = ({ data }: { data: string }) => {
  const receiveData = JSON.parse(data);

  if (messageHandlers[receiveData.type]) {
    messageHandlers[receiveData.type].forEach(messageHandler => {
      messageHandler(receiveData);
    });
  }
};
/**
 * 소켓 통신으로 message 이벤트를 구독
 * @desc useEffect 에서 return 으로 호출합니다.
 * @param {WebSocket} socket
 * @param {SocketRequest} requestData
 * @param {MessageHandler} messageHandler message 이벤트 발생 시 수행하는 함수
 * @return UNSUBSCRIBE를 수행하는 함수 반환
 */
export const subscribeSocket = (
  socket: WebSocket | null,
  requestData: SocketRequest,
  messageHandler: MessageHandler,
) => {
  if (!socket) return;
  const sedData = {
    command: 'SUBSCRIBE',
    ...requestData,
  } as any;

  requestCountByGuid[requestData.guid] = requestCountByGuid[requestData.guid]
    ? ++requestCountByGuid[requestData.guid]
    : 1;

  if (requestCountByGuid[requestData.guid] === 1) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(sedData);
    } else {
      socket.addEventListener('open', () => {
        socket.send(sedData);
      });
    }
    if (!messageHandlers[requestData.type]) {
      messageHandlers[requestData.type] = [];
    }

    messageHandlers[requestData.type].push(messageHandler);
  }

  if (!isSocketEventSubscribed) {
    socket.addEventListener('message', handleOnSocketMessage);
    isSocketEventSubscribed = true;
  }

  return () => {
    requestCountByGuid[requestData.guid]--;

    if (requestCountByGuid[requestData.guid] === 0) {
      delete requestCountByGuid[requestData.guid];
      socket.send({
        command: 'UNSUBSCRIBE',
        ...requestData,
      } as any);

      const handlerIndex = messageHandlers[requestData.type].findIndex(
        handler => handler === messageHandler,
      );
      if (handlerIndex > -1) {
        messageHandlers[requestData.type].splice(handlerIndex, 1);
      }
    }

    if (Object.keys(requestCountByGuid).length === 0) {
      socket.removeEventListener('message', handleOnSocketMessage);
    }
  };
};

export const API = createApiClient({ timeout: 3000 });
