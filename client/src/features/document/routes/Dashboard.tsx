import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components';
import { FlickerDocsLogo } from '@/constants';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className='h-20 shadow-md flex justify-between items-center px-12'>
        <div className='flex gap-3 items-center'>
          <FlickerDocsLogo />
          <h1 className='text-3xl font-bold'>Flicker Docs</h1>
        </div>
        <div className='flex gap-8'>
          <Button>Upgrade plan</Button>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className='flex flex-col items-center gap-4 pt-8'>
        <h1 className='text-4xl'>docs</h1>
        <button
          onClick={() => navigate('/editor/12342332')}
          className='bg-black text-white p-3 rounded-xl content-center'
        >
          Go to editor
        </button>
      </div>
    </>
  );
};
