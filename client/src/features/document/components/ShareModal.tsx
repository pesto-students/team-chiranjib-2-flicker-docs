import { Lock, X } from 'lucide-react';
import { useState } from 'react';

import { Button, Input } from '@/components';

type Props = {
  closeModal: () => void;
  Modal: React.FC<any>;
};

const ShareModal = ({ closeModal, Modal }: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <Modal>
      <div className='flex h-[360px] w-[600px] flex-col justify-between rounded-md bg-white'>
        <div className='flex h-[50px] items-center justify-between border-b-2 border-slate-100 px-6'>
          <p>Share</p>
          <button onClick={closeModal} className=' rounded-full p-1 hover:bg-slate-100'>
            <X />
          </button>
        </div>
        <div className='flex-1 p-6'>
          <Input placeholder='Enter Email...' type='email' required />
        </div>

        <div className='flex h-16 items-center justify-between border-t-2 border-slate-100 p-6'>
          <Button
            variant='outline'
            className='rounded-full border-blue-600 text-blue-600 hover:text-blue-700'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? (
              'Copied'
            ) : (
              <>
                <Lock className='mr-2 h-4 w-4' /> Copy Link
              </>
            )}
          </Button>
          <Button onClick={closeModal}>Done</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
