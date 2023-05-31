import axios from 'axios';
import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export const SignUp = () => {
  const url = 'http://localhost:5000/auth/signin';

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
        localStorage.setItem('user', JSON.stringify(axiosResponse?.data?.user));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '244593955079-cauv4gaj7co1cfa2len0ted4micpkjd4.apps.googleusercontent.com',
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
      <div id='signUpDiv' data-text='signup_with'></div>
    </main>
  );
};
