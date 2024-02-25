import { random, shuffle } from 'lodash';

export const dirtyAndImpreciseFloat = number =>
  parseFloat(parseFloat(`${number}`).toFixed(4));

export const 한국_어제_가격 = [
  { name: '삼성전자', closedPrice: 67900 },
  { name: 'GS글로벌', closedPrice: 4145 },
  { name: '카카오', closedPrice: 93100 },
  { name: '쌍방울', closedPrice: 638 },
  { name: '티사이언티픽', closedPrice: 4120 },
  { name: '고려시멘트', closedPrice: 4750 },
  { name: 'KG케미칼', closedPrice: 48100 },
  { name: '지에스이', closedPrice: 7300 },
  { name: '휴림로봇', closedPrice: 1975 },
  { name: '일동제약', closedPrice: 59500 },
  { name: '카카오게임즈', closedPrice: 60700 },
  { name: '카카오페이', closedPrice: 136500 },
  { name: '대한전선', closedPrice: 1755 },
  { name: '카카오뱅크', closedPrice: 45300 },
  { name: '광림', closedPrice: 1665 },
  { name: 'HMM', closedPrice: 26650 },
  { name: '미래생명자원', closedPrice: 10250 },
  { name: 'KG스틸', closedPrice: 19450 },
  { name: '삼성전자우', closedPrice: 59100 },
  { name: 'LG에너지솔루션', closedPrice: 27100 },
];

export const 한국_지원종목_가격 = [
  { name: '삼성전자', price: 67000 },
  { name: 'GS글로벌', price: 3850 },
  { name: '카카오', price: 94100 },
  { name: '쌍방울', price: 794 },
  { name: '티사이언티픽', price: 3925 },
  { name: '고려시멘트', price: 4545 },
  { name: 'KG케미칼', price: 44800 },
  { name: '지에스이', price: 6090 },
  { name: '휴림로봇', price: 1950 },
  { name: '일동제약', price: 64500 },
  { name: '카카오게임즈', price: 66700 },
  { name: '카카오페이', price: 132500 },
  { name: '대한전선', price: 1755 },
  { name: '카카오뱅크', price: 45300 },
  { name: '광림', price: 2520 },
  { name: 'HMM', price: 26600 },
  { name: '미래생명자원', price: 10750 },
  { name: 'KG스틸', price: 17700 },
  { name: '삼성전자우', price: 60500 },
  { name: 'LG에너지솔루션', price: 41100 },
];

export const 한국_지원종목명_인덱스 = 한국_지원종목_가격.reduce(
  (pv, cv, currentIndex) => {
    pv[cv.name] = currentIndex;
    return pv;
  },
  {},
);

export const 미국_어제_가격 = [
  { name: '베루', price: 8.2699 },
  { name: '폴라리티TE', price: 0.5681 },
  { name: '릭스트 바이오테크놀로지 홀딩스', price: 5.6905 },
  { name: 'Direxion Daily Semicondutor Bull 3X Shares', price: 28.3701 },
  { name: '바이오데식스', price: 2.3455 },
  { name: '테슬라', price: 1028.6277 },
  { name: '엔비디아', price: 217.78 },
  { name: 'ProShares UltraPro QQQ', price: 50.465 },
  { name: '애플', price: 171.04 },
  { name: '임페리얼 페트롤리엄', price: 1.5152 },
  { name: '멀른 오토모티브', price: 2.4188 },
  { name: '바이오카디아', price: 2.0993 },
  { name: '선샤인 바이오파바', price: 5.0318 },
  { name: 'ProShares UltraPro Short QQQ ETF', price: 38 },
  { name: '악티늄 파마슈티컬스', price: 7.9103 },
  { name: '애글리아 바이오 테라퓨틱스', price: 2.3108 },
  { name: '애자일 테라퓨틱스', price: 0.1981 },
  { name: '루시드 그룹', price: 21.575 },
  { name: '로블록스 Class A', price: 44.0003 },
  { name: '쿠팡 Class A ', price: 17.8225 },
];

export const 미국_지원종목_가격 = [
  { name: '베루', price: 10.33 },
  { name: '폴라리티TE', price: 0.3766 },
  { name: '릭스트 바이오테크놀로지 홀딩스', price: 3.7205 },
  { name: 'Direxion Daily Semicondutor Bull 3X Shares', price: 27.39 },
  { name: '바이오데식스', price: 2.0205 },
  { name: '테슬라', price: 1005.03 },
  { name: '엔비디아', price: 219.4 },
  { name: 'ProShares UltraPro QQQ', price: 49.51 },
  { name: '애플', price: 168.725 },
  { name: '임페리얼 페트롤리엄', price: 1.3602 },
  { name: '멀른 오토모티브', price: 2.5693 },
  { name: '바이오카디아', price: 2.2293 },
  { name: '선샤인 바이오파바', price: 4.6818 },
  { name: 'ProShares UltraPro Short QQQ ETF', price: 38.685 },
  { name: '악티늄 파마슈티컬스', price: 6.9103 },
  { name: '애글리아 바이오 테라퓨틱스', price: 2.48 },
  { name: '애자일 테라퓨틱스', price: 0.1981 },
  { name: '루시드 그룹', price: 21.73 },
  { name: '로블록스 Class A', price: 44.3503 },
  { name: '쿠팡 Class A ', price: 17.7125 },
];

export const 미국_지원종목명_인덱스 = 미국_지원종목_가격.reduce(
  (pv, cv, currentIndex) => {
    pv[cv.name] = currentIndex;
    return pv;
  },
  {},
);

export const 현재_내보유_한국 = shuffle(한국_지원종목_가격)
  .slice(10)
  .map(({ name }) => ({
    name,
    country: 'KR',
    amount: dirtyAndImpreciseFloat(random(1, 300)),
  }));

export const 현재_내보유_미국 = shuffle(미국_지원종목_가격)
  .slice(10)
  .map(({ name }) => ({
    name,
    country: 'US',
    amount: dirtyAndImpreciseFloat(random(1, 300, true)),
  }));

export const 현재_내보유_전체 = shuffle([
  ...현재_내보유_한국,
  ...현재_내보유_미국,
]);

export const 현재_공통정보 = {
  한국시장: 2666.76,
  미국시장: 4439.62,
  환율: 1225.73,
};

export const messageInterval = 300;
