import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useAuth } from '@/hooks';

import { protectedRoutes } from './protected';

const Pricing = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>Pricing page</h1>
    </div>
  );
};

export const AppRoutes = () => {
  const { user } = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/pricing', element: <Pricing /> },
  ];

  const routes = user ? protectedRoutes : [];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
