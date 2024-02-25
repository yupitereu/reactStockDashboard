import { 현재_공통정보 } from '../../common';

const 시장정보 = {
  uri: '/info',
  handleResponse: () => {
    const data = {
      KR: 현재_공통정보.한국시장,
      US: 현재_공통정보.미국시장,
    };

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 시장정보;
