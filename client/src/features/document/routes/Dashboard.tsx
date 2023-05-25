import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>docs</h1>
      <button
        onClick={() => navigate('/editor/12342332')}
        className='bg-black text-white p-3 rounded-xl content-center'
      >
        Go to editor
      </button>
    </div>
  );
};
