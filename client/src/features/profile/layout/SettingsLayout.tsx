import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components';
import { SettingsLayout } from '@/components/Layout/ProfileLayout';

export const Settings = () => {
  return (
    <SettingsLayout>
      <Suspense
        fallback={
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner size='md' />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </SettingsLayout>
  );
};
