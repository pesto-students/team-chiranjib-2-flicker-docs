import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { Button } from '@/components';
import { SignUp } from '@/features/auth';
import { useAuth } from '@/hooks';
import { logout } from '@/lib';

const Home = ({ user }: { user: any }) => {
  return (
    <div className='flex justify-center pt-8'>
      <div className='flex w-1/6 flex-col items-center gap-3'>
        <img src={user.picture} alt='phot' className='rounded-full' />
        <h3 className='font-semibold text-slate-600'>{user?.email}</h3>

        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
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
