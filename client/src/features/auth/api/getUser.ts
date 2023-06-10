import { axiosClient } from '@/lib';

// import { AuthUser } from '../types';

export const getUser = async () => {
  try {
    const response = await axiosClient.get('/auth/me');
    return {
      ...response.data.user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
