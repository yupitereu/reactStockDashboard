import { 미국_어제_가격 } from '../../common';

const 종목시세_미국 = {
  uri: '/closed-price/us',
  handleResponse: () => {
    const data = 미국_어제_가격;

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 종목시세_미국;
