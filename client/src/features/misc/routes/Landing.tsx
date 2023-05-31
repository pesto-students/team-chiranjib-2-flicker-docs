import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { SignUp } from '@/features/auth';
import { useAuth } from '@/hooks';
import { logout } from '@/lib';

const Home = ({ user }: { user: any }) => {
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

  const { user } = useAuth();

  return (
    <>
      <div className='flex flex-col items-center gap-4 pt-8'>
        <h1 className='text-4xl'>Landing page</h1>
        <button
          onClick={() => {
            if (user) {
              navigate('/dashboard');
            } else {
              toast.error('You need to login first');
            }
          }}
          className='content-center rounded-md bg-black p-3 text-white'
        >
          Go to docs
        </button>
      </div>
      {user ? <Home user={user} /> : <SignUp />}
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
};
