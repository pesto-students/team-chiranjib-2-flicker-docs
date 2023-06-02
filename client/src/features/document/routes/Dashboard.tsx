import axios from 'axios';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import { Button, Header } from '@/components';
import { API_URL } from '@/config';
import { useAuth } from '@/hooks';

import DocumentTabs from '../components/DocumentTabs';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createANewDocument = async () => {
    const docName = uniqid();
    await axios.post(`${API_URL}/document`, {
      user,
      docName,
    });

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
