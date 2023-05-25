import { useEffect, useRef, useState } from 'react';

import SingleDocument from './SingleDocument';

const documentsOwned = [
  {
    id: '12342332',
    title: 'Flicker document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '12345532',
    title: 'My second document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '55342332',
    title: 'My third document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '12342442',
    title: 'Flicker docs',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '33342332',
    title: 'My first document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
];

const documentsShared = [
  {
    id: '12442332',
    title: 'Shared document',
    lastModified: '2023-05-25T12:00:00.000Z',
  },
  {
    id: '12645532',
    title: 'shared document',
    lastModified: '2023-01-01T12:00:00.000Z',
  },
  {
    id: '55382332',
    title: 'shared third document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '12392442',
    title: 'shared docs',
    lastModified: '2022-01-18T12:00:00.000Z',
  },
  {
    id: '3344332',
    title: 'shared first document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
  {
    id: '33344332',
    title: 'shared first document',
    lastModified: '2021-01-01T12:00:00.000Z',
  },
];

const tabsData = [
  {
    label: 'All Docs',
    data: [...documentsOwned, ...documentsShared],
  },
  {
    label: 'Owned by me',
    data: documentsOwned,
  },
  {
    label: 'Shared with me',
    data: documentsShared,
  },
];

export function DocumentTabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

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
        {tabsData[activeTabIndex].data.map((docData) => (
          <SingleDocument {...docData} key={docData.id} />
        ))}
      </div>
    </div>
  );
}

export default DocumentTabs;
