import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useAuth } from '@/hooks';

import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const { user } = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = user ? protectedRoutes : [];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
