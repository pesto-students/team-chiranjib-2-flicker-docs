import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { SettingsLayout } from '@/components/Layout/ProfileLayout';
import { lazyImport } from '@/utils/lazyImport';
const { Editor } = lazyImport(() => import('@/features/document'), 'Editor');
const { Dashboard } = lazyImport(() => import('@/features/document'), 'Dashboard');

const Settings = () => {
  return (
    <SettingsLayout>
      <Suspense
        fallback={
          <div className='flex h-full w-full items-center justify-center'>
            {/* <Spinner size="sm" /> */}
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </SettingsLayout>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>profile</h1>
      <button
        onClick={() => navigate('/dashboard')}
        className='content-center rounded-xl bg-black p-3 text-white'
      >
        go back to docs
      </button>
    </div>
  );
};

const MyPlan = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>Myplan</h1>
      <button
        onClick={() => navigate('/dashboard')}
        className='content-center rounded-xl bg-black p-3 text-white'
      >
        go back to docs
      </button>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/editor/:id',
    element: <Editor />,
  },
  {
    path: '/settings',
    element: <Settings />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'my-plan', element: <MyPlan /> },
    ],
  },
];
