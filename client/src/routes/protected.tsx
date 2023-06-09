// import { Suspense } from 'react';
// import { Outlet } from 'react-router-dom';

// import { SettingsLayout } from '@/components/Layout/ProfileLayout';
import { lazyImport } from '@/utils/lazyImport';
const { Editor } = lazyImport(() => import('@/features/document'), 'Editor');
const { Dashboard } = lazyImport(() => import('@/features/document'), 'Dashboard');
const { Plans } = lazyImport(() => import('@/features/payment'), 'Plans');
const { Success } = lazyImport(() => import('@/features/payment'), 'Success');
const { Cancel } = lazyImport(() => import('@/features/payment'), 'Cancel');

const { Settings } = lazyImport(() => import('@/features/profile'), 'Settings');
const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');
const { MyPlan } = lazyImport(() => import('@/features/profile'), 'MyPlan');

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
    path: '/plans',
    element: <Plans />,
  },
  {
    path: '/plans/success',
    element: <Success />,
  },
  {
    path: '/plans/cancel',
    element: <Cancel />,
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
