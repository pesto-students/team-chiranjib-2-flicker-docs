import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Spinner } from '@/components/';
import { loadUser } from '@/lib';
import { queryClient } from '@/lib/react-query';

import AuthContext, { User } from './auth-context';

const ErrorFallback = () => {
  return (
    <div
      className='flex h-screen w-screen flex-col items-center justify-center text-red-500'
      role='alert'
    >
      <h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>

      <div className='mt-4 flex gap-4'>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
        <Button onClick={() => window.location.assign(window.location.origin)}>Go to home</Button>
      </div>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const userData = await loadUser();
      if (!userData) {
        if (location.pathname !== '/') {
          navigate(`/?redirect=${location.pathname}${location.search}`);
        }
      } else {
        setUser(userData);
      }
    })();
  }, []);

  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-screen items-center justify-center'>
          <Spinner size='md' />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools initialIsOpen={false} />}

            <AuthContext.Provider value={{ user, setUser }}>
              {/* <Router> */}
              {children}
              {/* </Router> */}
            </AuthContext.Provider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
