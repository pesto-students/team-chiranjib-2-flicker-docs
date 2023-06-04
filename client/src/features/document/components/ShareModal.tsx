import { useQuery } from '@tanstack/react-query';
import { Lock, X } from 'lucide-react';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components';
import { User } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

type Props = {
  closeModal: () => void;
  Modal: React.FC<any>;
};

type UserRowProps = {
  user: User;
  status: string;
};
const UserRow = ({ user, status }: UserRowProps) => (
  <div className='flex justify-between'>
    <div className='flex gap-4'>
      <Avatar className='h-6 w-6'>
        <AvatarImage src={user?.picture} alt='@shadcn' />
        <AvatarFallback>
          {user?.firstName.charAt(0)}
          {user?.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p className='capitalize text-slate-600'>{user.name.toLowerCase()}</p>
    </div>
    <p className='text-sm font-light text-slate-600'>{status}</p>
  </div>
);

const ShareModal = ({ closeModal, Modal }: Props) => {
  const [copied, setCopied] = useState(false);

  const [searchParams] = useSearchParams();
  const { id: docName } = useParams();

  const copyLinkButtonHandler = () => {
    const shared = searchParams.get('s');
    if (shared) {
      navigator.clipboard.writeText(`${window.location.href}`);
    } else {
      navigator.clipboard.writeText(`${window.location.href}?s=1`);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { error, data } = useQuery({
    queryKey: ['sharedUsers'],
    queryFn: () => {
      return axiosClient.get(`/document/${docName}/shared-users`);
    },
    select: (res) => res.data,
    enabled: !!docName,
  });

  return (
    <Modal>
      <div className='flex h-[360px] w-[600px] flex-col justify-between rounded-md bg-white'>
        <div className='flex h-[100px] items-center justify-between border-b-2 border-slate-100 px-6'>
          <p>Share</p>
          <button onClick={closeModal} className=' rounded-full p-1 hover:bg-slate-100'>
            <X />
          </button>
        </div>
        <div className='flex-1 p-6'>
          <Input placeholder='Enter Email...' type='email' required />
        </div>
        {error ? (
          <div>count not fetch users</div>
        ) : (
          <div className='h-full overflow-x-auto px-6'>
            <p className='pb-4 text-sm text-slate-600'>Only those invited can open the link.</p>
            <div className='flex flex-col gap-3'>
              {data?.owners?.map((user: any) => (
                <UserRow key={user._id} user={user} status='owner' />
              ))}
              {data?.sharedUsers?.map((user: any) => (
                <UserRow key={user._id} user={user} status='can edit' />
              ))}
            </div>
          </div>
        )}

        <div className='flex h-16 items-center justify-between border-t-2 border-slate-100 p-6'>
          <Button
            variant='outline'
            className='rounded-full border-blue-600 text-blue-600 hover:text-blue-700'
            onClick={copyLinkButtonHandler}
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
