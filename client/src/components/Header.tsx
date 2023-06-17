/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useLocation, useNavigate } from 'react-router-dom';

import { FlickerDocsLogo } from '@/constants';

import { AvatarWithDropdown } from './AvatarWithDropdown';
import { Button } from './ui/button';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className='flex h-16 items-center justify-between border-b border-slate-100 px-12 shadow-md'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className='flex cursor-pointer items-center gap-3'
        onClick={() => navigate('/dashboard')}
      >
        <FlickerDocsLogo />
        <h1 className='text-sm font-extrabold md:text-3xl'>Flicker Docs</h1>
      </div>
      <div className='flex gap-8'>
        {pathname !== '/plans' ? (
          <Button size={'sm'} onClick={() => navigate('/plans')}>
            Upgrade plan
          </Button>
        ) : null}
        <AvatarWithDropdown />
      </div>
    </header>
  );
};
