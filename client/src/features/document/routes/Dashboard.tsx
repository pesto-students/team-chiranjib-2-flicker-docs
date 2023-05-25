import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button, Header } from '@/components';

import DocumentTabs from '../components/DocumentTabs';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main>
        <div className='container px-28 py-8'>
          <Button onClick={() => navigate('/editor/12342332')}>
            <Plus className='mr-2 h-4 w-4' />
            Start a new document
          </Button>
          <DocumentTabs />
        </div>
      </main>
    </>
  );
};
