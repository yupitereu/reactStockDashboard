import mockRest from './rest';
import mockSocket from './socket';

const enableMock = () => {
  mockSocket();
  mockRest();
};

export default enableMock;
