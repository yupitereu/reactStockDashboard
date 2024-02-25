import { Header } from '../components/pageItem/header';
import { MyStocks } from '../components/pageItem/priceList/myStocks';
import { RealtimeStocksProvider } from '../components/pageItem/priceList/realtimeStocksProvider';
import { Stocks } from '../components/pageItem/priceList/stocks';

export const Dashboard = () => (
  <div className="w-full border border-black m-3 p-1">
    <Header />
    <main className="flex">
      <RealtimeStocksProvider>
        <Stocks />
        <MyStocks />
      </RealtimeStocksProvider>
    </main>
  </div>
);
