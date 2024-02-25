import { 현재_공통정보 } from '../../common';

const 현재환율 = {
  uri: '/rate',
  handleResponse: () => {
    const data = 현재_공통정보.환율;

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 현재환율;
