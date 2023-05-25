import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { Button, Spinner } from '@/components/';
// import { AuthProvider } from "@/lib/auth";
import { queryClient } from '@/lib/react-query';

const ErrorFallback = () => {
  return (
    <div
      className='flex h-screen w-screen flex-col items-center justify-center text-red-500'
      role='alert'
    >
      <h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>
      <Button className='mt-4' onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className='flex h-screen w-screen items-center justify-center'>
          <Spinner size='sm' />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}

            {/* <AuthProvider> */}
            <Router>{children}</Router>
            {/* </AuthProvider> */}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
