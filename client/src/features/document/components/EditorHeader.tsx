import { useMutation } from '@tanstack/react-query';
import { Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { AvatarWithDropdown, Button } from '@/components';
import { FlickerDocsLogo } from '@/constants';
import { Document } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

import { CustomToolbar } from './CustomToolbar';

type ModalProps = {
  openModal: () => void;
  document: Document;
  editor: any;
};

export const EditorHeader = ({ openModal, document, editor }: ModalProps) => {
  const [docDisplayName, setDocDisplayName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (newDisplayName: string) => {
      return axiosClient.put(`/document/${document._id}/display-name`, {
        documentDisplayName: newDisplayName,
      });
    },
    onSuccess: () => {
      inputRef?.current?.blur();
      toast.success('Document renamed successfully');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
  });

  useEffect(() => {
    setDocDisplayName(document?.displayName || '');
  }, [document?.displayName]);

  return (
    <div className='flex h-[115px] flex-col justify-between py-3 pe-8 ps-8'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div>
            <FlickerDocsLogo />
          </div>
          <div className='flex flex-col justify-between'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                inputRef?.current?.blur();
              }}
            >
              <input
                ref={inputRef}
                className='border-box rounded-md px-[4px] py-[2px] text-lg font-semibold leading-none text-slate-600 focus:border focus:border-slate-400 focus:outline-none'
                value={docDisplayName}
                onChange={(e) => setDocDisplayName(e.target.value)}
                onBlur={() => mutation.mutate(docDisplayName)}
              />
            </form>
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
      <div className='max-h-24'>
        <CustomToolbar editor={editor} />
      </div>
      <Toaster />
    </div>
  );
};
