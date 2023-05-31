import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { SignUp } from '@/features/auth';

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

export const Landing = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();

  // const handleStart = () => {
  //   if (user) {
  //     navigate('/app');
  //   } else {
  //     navigate('/auth/login');
  //   }
  // };

  const [user, setUser] = useState({ email: '' });

  useEffect(() => {
    const theUser = localStorage.getItem('user');

    if (theUser && !theUser.includes('undefined')) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <>
      <div className='flex flex-col items-center gap-4 pt-8'>
        <h1 className='text-4xl'>Landing page</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className='content-center rounded-md bg-black p-3 text-white'
        >
          Go to docs
        </button>
      </div>
      {user?.email ? <Home user={user} /> : <SignUp />}
    </>
  );
};
