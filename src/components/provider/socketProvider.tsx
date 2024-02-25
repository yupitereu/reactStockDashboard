import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const SocketContext = createContext<WebSocket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = (props: SocketProviderProps) => {
  const { children } = props;
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:3000/socket'));

    return () => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket?.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

interface SocketProviderProps {
  children: ReactNode;
}
