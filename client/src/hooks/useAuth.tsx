import { useContext } from 'react';

import authContext from '@/providers/auth-context';

export const useAuth = () => {
  const auth = useContext(authContext);
  return auth;
};
