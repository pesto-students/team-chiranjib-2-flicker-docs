import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/hooks';

import SingleDocument from './SingleDocument';

const tabsData = [
  {
    label: 'All Docs',
  },
  {
    label: 'Owned by me',
  },
  {
    label: 'Shared with me',
  },
];

type Document = {
  _id: string;
  name: string;
  displayName: string;
  createdAt: string;
  updatedAt?: string;
};
export function DocumentTabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const [documents, setDocuments] = useState<Document[]>([]);

  const { user } = useAuth();
  const tabsRef = useRef<any>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/document`, {
        params: {
          user,
        },
      });

      setDocuments(response.data.documents);
    };

    fetchData();
  }, []);

  return (
    <div className='mt-6'>
      <div className='relative'>
        <div className='flex space-x-4 border-b'>
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={tab.label}
                ref={(el) => (tabsRef.current[idx] = el)}
                className={`pb-3 pt-2 text-sm ${
                  idx === activeTabIndex ? 'font-bold' : 'font-medium'
                }`}
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className='absolute bottom-0 block h-0.5 bg-black transition-all duration-300'
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className='grid grid-cols-5 gap-6 py-8'>
        {documents.map((docData) => (
          <SingleDocument {...docData} key={docData._id} />
        ))}
      </div>
    </div>
  );
}

export default DocumentTabs;
