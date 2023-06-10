import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>profile</h1>
      <button
        onClick={() => navigate('/dashboard')}
        className='content-center rounded-xl bg-black p-3 text-white'
      >
        go back to docs
      </button>
    </div>
  );
};
