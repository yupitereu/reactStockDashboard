import {
  미국_지원종목_가격,
  미국_지원종목명_인덱스,
  한국_지원종목_가격,
  한국_지원종목명_인덱스,
  현재_내보유_전체,
} from '../../common';

const 보유주식_전체 = {
  uri: '/assets',
  handleResponse: () => {
    const data = 현재_내보유_전체.reduce(
      (pv, cv, currentIndex) => {
        const prices =
          cv.country === 'KR' ? 한국_지원종목_가격 : 미국_지원종목_가격;
        const indexes =
          cv.country === 'KR' ? 한국_지원종목명_인덱스 : 미국_지원종목명_인덱스;
        pv[currentIndex].price = prices[indexes[cv.name]].price;

        return pv;
      },
      [...현재_내보유_전체],
    );

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 보유주식_전체;
