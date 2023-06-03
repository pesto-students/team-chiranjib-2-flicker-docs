import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import { Button, Header } from '@/components';
import { useAuth } from '@/hooks';
import { axiosClient } from '@/lib';

import DocumentTabs from '../components/DocumentTabs';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

    navigate(`/editor/${docName}`);
  };

  return (
    <>
      <Header />
      <main>
        <div className='container px-28 py-8'>
          <Button onClick={createANewDocument}>
            <Plus className='mr-2 h-4 w-4' />
            Start a new document
          </Button>
          <DocumentTabs />
        </div>
      </main>
    </>
  );
};
