import { useEffect } from 'react';

const MockSamples = () => {
  useEffect(() => {
    fetch('/assets')
      .then(res => res.json())
      .then(console.log);
    fetch('/assets/kr')
      .then(res => res.json())
      .then(console.log);
    fetch('/assets/us')
      .then(res => res.json())
      .then(console.log);
    fetch('/stock-price/kr')
      .then(res => res.json())
      .then(console.log);
    fetch('/stock-price/us')
      .then(res => res.json())
      .then(console.log);
    fetch('/closed-price/kr')
      .then(res => res.json())
      .then(console.log);
    fetch('/closed-price/us')
      .then(res => res.json())
      .then(console.log);
    fetch('/rate')
      .then(res => res.json())
      .then(console.log);
    fetch('/info')
      .then(res => res.json())
      .then(console.log);
  }, []);

  useEffect(() => {
    let unsubscribeMessageTimeoutId;

    const socket = new WebSocket('ws://localhost:3000/socket');

    const handleOnSocketMessage = ({ data }) => {
      console.log(data);
    };

    const handleOnSocketOpen = () => {
      console.log('SUBSCRIBE WEBSOCKET');

      socket.send({
        guid: 'global-unique-id-1',
        command: 'SUBSCRIBE',
        type: 'PRICE',
        country: 'KR',
        name: '카카오페이',
      });

      socket.send({
        guid: 'global-unique-id-2',
        command: 'SUBSCRIBE',
        type: 'PRICE',
        country: 'US',
        name: '애플',
      });

      socket.send({
        guid: 'global-unique-id-3',
        command: 'SUBSCRIBE',
        type: 'RATE',
      });

      socket.send({
        guid: 'global-unique-id-4',
        command: 'SUBSCRIBE',
        type: 'INFO',
        country: 'KR',
      });

      socket.send({
        guid: 'global-unique-id-5',
        command: 'SUBSCRIBE',
        type: 'INFO',
        country: 'US',
      });

      socket.send({
        guid: 'global-unique-id-6',
        command: 'SUBSCRIBE',
        type: 'NEW_TRADE',
      });

      unsubscribeMessageTimeoutId = setTimeout(() => {
        console.log('UNSUBSCRIBE WEBSOCKET');
        socket.send({
          guid: 'global-unique-id-1',
          command: 'UNSUBSCRIBE',
          type: 'PRICE',
          country: 'KR',
          name: '카카오페이',
        });

        socket.send({
          guid: 'global-unique-id-2',
          command: 'UNSUBSCRIBE',
          type: 'PRICE',
          country: 'US',
          name: '애플',
        });

        socket.send({
          guid: 'global-unique-id-3',
          command: 'UNSUBSCRIBE',
          type: 'RATE',
        });

        socket.send({
          guid: 'global-unique-id-4',
          command: 'UNSUBSCRIBE',
          type: 'INFO',
          country: 'KR',
        });

        socket.send({
          guid: 'global-unique-id-5',
          command: 'UNSUBSCRIBE',
          type: 'INFO',
          country: 'US',
        });

        socket.send({
          guid: 'global-unique-id-6',
          command: 'UNSUBSCRIBE',
          type: 'NEW_TRADE',
        });
      }, 10000);
    };

    socket.addEventListener('message', handleOnSocketMessage);
    socket.addEventListener('open', handleOnSocketOpen);

    return () => {
      clearTimeout(unsubscribeMessageTimeoutId);
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

  return <div> (MockSample) console.log 를 확인하세요. </div>;
};

export default MockSamples;
