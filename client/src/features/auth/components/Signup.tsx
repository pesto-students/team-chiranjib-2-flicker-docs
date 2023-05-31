import axios from 'axios';
import { useEffect } from 'react';

import { login } from '@/lib';

declare global {
  interface Window {
    google: any;
  }
}

export const SignUp = () => {
  const url = `${process.env.REACT_APP_API}/auth/signin`;

  const handleGoogle = async (response: any) => {
    const data = JSON.stringify({ credential: response.credential });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const axiosResponse = await axios.post(url, data, config);

      if (axiosResponse?.data?.user) {
        login(JSON.stringify(axiosResponse?.data?.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // /* global google */

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
