import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import { Button, Header } from '@/components';
import { useAuth } from '@/hooks';
import { axiosClient } from '@/lib';

import DocumentTabs from '../components/DocumentTabs';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [docName, setDocName] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (docName: string) => {
      return axiosClient.post(`/document`, {
        user,
        docName,
      });
    },
  });

  const createANewDocument = async () => {
    const docName = uniqid();

    mutation.mutate(docName);
    setDocName(docName);
  };

  if (mutation.isSuccess) {
    navigate(`/editor/${docName}`);
  }

  if (mutation.error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toast.error(mutation.error?.response?.data.message);
  }

  return (
    <>
      <Header />
      <main
        style={{
          backgroundImage: 'url(' + require('../../../constants/img/bg_image1.png') + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 64px)',
          width: '100%',
        }}
      >
        <div className='container px-28 py-8'>
          <Button onClick={createANewDocument}>
            <Plus className='mr-2 h-4 w-4' />
            Start a new document
          </Button>
          <DocumentTabs />
        </div>
      </main>
      <Toaster />
    </>
  );
};
