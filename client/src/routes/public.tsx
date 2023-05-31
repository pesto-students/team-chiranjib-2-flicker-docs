// import { lazyImport } from "@/utils/lazyImport";

import { Button } from '@/components';

// const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const AuthRoutes = () => {
  const googleAuth = () => {
    console.log(process.env.REACT_APP_API_URL);

    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, '_self');
  };
  return (
    <Button onClick={googleAuth}>
      <span>Sign in with Google</span>
    </Button>
  );
};

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
