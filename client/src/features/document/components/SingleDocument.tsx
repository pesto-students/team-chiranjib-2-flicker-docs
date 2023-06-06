import dayjs from 'dayjs';
import { FileText, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

type SingleDocumentProps = {
  _id: string;
  name: string;
  displayName: string;
  createdAt: string;
  updatedAt?: string;
};

const SingleDocument = ({ displayName, createdAt, updatedAt, name }: SingleDocumentProps) => {
  return (
    <div className='h-64 overflow-hidden rounded-md border border-slate-200 shadow-sm hover:shadow-md'>
      <Link to={`/editor/${name}`}>
        <div className='h-[70%]'></div>
      </Link>
      <div className='flex h-[30%] gap-2 border-t p-4'>
        <div className='flex h-full w-[90%] flex-col justify-between'>
          <p className=' truncate text-sm text-slate-600'>{displayName}</p>
          <div className='flex'>
            <FileText className='h-4' />
            <p className='truncate text-xs text-slate-600'>
              Opened {dayjs(updatedAt ? updatedAt : createdAt).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
        <div className='flex h-full items-center'>
          <MoreVertical />
        </div>
      </div>
    </div>
  );
};

export default SingleDocument;
