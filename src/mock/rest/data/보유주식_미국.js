import {
  미국_지원종목_가격,
  미국_지원종목명_인덱스,
  현재_내보유_미국,
} from '../../common';

const 보유주식_미국 = {
  uri: '/assets/us',
  handleResponse: () => {
    const data = 현재_내보유_미국.reduce(
      (pv, cv, currentIndex) => {
        pv[currentIndex].price =
          미국_지원종목_가격[미국_지원종목명_인덱스[cv.name]].price;

        return pv;
      },
      [...현재_내보유_미국],
    );

    return {
      data,
      responseAt: Date.now(),
    };
  },
};

export default 보유주식_미국;
