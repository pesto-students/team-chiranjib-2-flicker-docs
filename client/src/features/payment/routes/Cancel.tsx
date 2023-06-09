import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';

export const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-10 flex flex-col items-center gap-6'>
      <p className='text-xl text-red-400'>Oops! It seems like there was a payment error. 🥹</p>
      <Button onClick={() => navigate('/plans')}>Go back</Button>
    </div>
  );
};
