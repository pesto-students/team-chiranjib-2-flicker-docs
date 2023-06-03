import { axiosClient } from '@/lib';

// import { AuthUser } from '../types';

export const getUser = async () => {
  try {
    const response = await axiosClient.get('/auth/me');
    console.log(response);
    return {
      _id: response.data.user._id,
      name: response.data.user.name,
      firstName: response.data.user.firstName,
      lastName: response.data.user.lastName,
      picture: response.data.user.picture,
      email: response.data.user.email,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
