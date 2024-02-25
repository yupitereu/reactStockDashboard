import { SendSocketResponse } from './dashboardServerResponse';

export type SocketRequest = {
  guid: string;
  type: string;
  country?: string;
  name?: string;
};

export type MessageHandler = <T extends SendSocketResponse>(
  receiveData: T,
) => void;
