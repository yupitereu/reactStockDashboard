import { 미국_지원종목_가격 } from '../../common';

const 종목시세_미국 = {
  uri: '/stock-price/us',
  handleResponse: () => {
    const data = 미국_지원종목_가격;

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 종목시세_미국;
