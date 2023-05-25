import dayjs from 'dayjs';
import { FileText, MoreVertical } from 'lucide-react';

type SingleDocumentProps = {
  id: string;
  title: string;
  lastModified: string;
};

const SingleDocument = ({ id, lastModified, title }: SingleDocumentProps) => {
  return (
    <div key={id} className='h-64 overflow-hidden rounded-md border border-slate-200 shadow-sm'>
      <div className='h-[70%]'></div>
      <div className='flex h-[30%] gap-2 border-t p-4'>
        <div className='flex h-full w-[90%] flex-col justify-between'>
          <p className=' truncate text-sm text-slate-600'>{title}</p>
          <div className='flex'>
            <FileText className='h-4' />
            <p className='truncate text-xs text-slate-600'>
              Opened {dayjs(lastModified).format('MMMM D, YYYY')}
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
