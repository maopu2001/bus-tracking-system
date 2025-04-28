'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function QueryClientProviderComponent({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
