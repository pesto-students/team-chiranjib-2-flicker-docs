import axios from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

const getHeaders = () => {
  const headers = {
    'Content-type': 'application/json',
  };
  const token = storage.getToken();

  if (token) {
    return {
      ...headers,
      Authorization: token,
    };
  } else {
    return {
      ...headers,
    };
  }
};

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
});
