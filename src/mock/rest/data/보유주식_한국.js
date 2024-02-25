import {
  한국_지원종목_가격,
  한국_지원종목명_인덱스,
  현재_내보유_한국,
} from '../../common';

const 보유주식_한국 = {
  uri: '/assets/kr',
  handleResponse: () => {
    const data = 현재_내보유_한국.reduce(
      (pv, cv, currentIndex) => {
        pv[currentIndex].price =
          한국_지원종목_가격[한국_지원종목명_인덱스[cv.name]].price;

        return pv;
      },
      [...현재_내보유_한국],
    );

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 보유주식_한국;
