// import { AppProvider } from '@/providers/app';
// import { AppRoutes } from '@/routes';

// const App = () => {
//   return (
//     <AppProvider>
//       <AppRoutes />
//     </AppProvider>
//   );
// };

// export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    google: any;
  }
}

const SignUp = () => {
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

const Home = ({ user }: { user: any }) => {
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };
  return (
    <div style={{ textAlign: 'center', margin: '3rem' }}>
      <img src={user.picture} alt='phot' />
      <h3>{user?.email}</h3>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState({ email: '' });

  useEffect(() => {
    const theUser = localStorage.getItem('user');

    if (theUser && !theUser.includes('undefined')) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return <>{user?.email ? <Home user={user} /> : <SignUp />}</>;
};

export default App;
