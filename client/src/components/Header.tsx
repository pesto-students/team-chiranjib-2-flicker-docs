import { FlickerDocsLogo } from '@/constants';

import { AvatarWithDropdown } from './AvatarWithDropdown';
import { Button } from './ui/button';

export const Header = () => (
  <header className='flex h-16 items-center justify-between px-12 shadow-md'>
    <div className='flex items-center gap-3'>
      <FlickerDocsLogo />
      <h1 className='text-sm font-extrabold md:text-3xl'>Flicker Docs</h1>
    </div>
    <div className='flex gap-8'>
      <Button size={'sm'}>Upgrade plan</Button>
      <AvatarWithDropdown />
    </div>
  </header>
);
