import { useEffect } from 'react';

import { GOOGLE_CLIENT_ID } from '@/config';
import { axiosClient, login } from '@/lib';

declare global {
  interface Window {
    google: any;
  }
}

export const SignUp = () => {
  const handleGoogle = async (response: any) => {
    const data = JSON.stringify({ credential: response.credential });

    try {
      const response = await axiosClient.post('/auth/signin', data);

      if (response?.data?.user) {
        login(response?.data?.user?.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
        theme: 'filled_black',
        text: 'continue_with',
        shape: 'pill',
      });
    }
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div id='signUpDiv' data-text='signup_with' className='mt-6'></div>
    </main>
  );
};
