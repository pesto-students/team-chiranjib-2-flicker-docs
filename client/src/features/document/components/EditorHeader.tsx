import { Lock } from 'lucide-react';

import { AvatarWithDropdown, Button } from '@/components';
import { FlickerDocsLogo } from '@/constants';

import { CustomToolbar } from './CustomToolbar';

type ModalProps = {
  openModal: () => void;
};

export const EditorHeader = ({ openModal }: ModalProps) => {
  return (
    <div className='flex h-[15vh] flex-col justify-between py-3 pe-8 ps-8'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div>
            <FlickerDocsLogo />
          </div>
          <div className='flex flex-col justify-between'>
            <h4 className='text-lg font-semibold leading-none text-slate-600'>Doc name</h4>
            <div className='flex gap-2 text-xs leading-none text-slate-600'>
              <p>File</p>
              <p>Edit</p>
              <p>View</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <Button onClick={openModal}>
            <Lock className='mr-2 h-4 w-4' /> Share
          </Button>

          <AvatarWithDropdown />
        </div>
      </div>
      <CustomToolbar />
    </div>
  );
};
