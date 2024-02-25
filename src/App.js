import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ApiProvider } from './components/provider/apiProvider';
import { SocketProvider } from './components/provider/socketProvider';
import { Dashboard } from './pages/dashboard';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            keepPreviousData: true,
            useErrorBoundary: true,
            retry: false,
            networkMode: 'always',
          },
          mutations: {
            networkMode: 'always',
          },
        },
      }),
  );

  return (
    <ApiProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>
      </SocketProvider>
    </ApiProvider>
  );
}

export default App;
