import { getUser } from '@/features/auth';
import storage from '@/utils/storage';

export const logout = () => {
  storage.clearToken();
  window.location.reload();
};

export const login = (token: any) => {
  storage.setToken(token);
  window.location.reload();
};

export const loadUser = async () => {
  if (storage.getToken()) {
    const data = await getUser();
    console.log(data);
    return data;
  }

  return null;
};
