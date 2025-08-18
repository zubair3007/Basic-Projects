import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';

import App from './App.jsx'
import {QueryClient, QueryClientProvider} from'@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

//Create a query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,  //Retry failed queries once
      staleTime: 5*1000, //Data is fetched for 5 seconds, no refetch needed
    },
  },
});


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> {/*Debug PAnel for Queries */}
    </QueryClientProvider>
  </StrictMode>
);
