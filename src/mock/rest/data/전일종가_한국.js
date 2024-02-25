import { 한국_어제_가격 } from '../../common';

const 종목시세_한국 = {
  uri: '/closed-price/kr',
  handleResponse: () => {
    const data = 한국_어제_가격;

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 종목시세_한국;
