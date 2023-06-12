import { useEffect, useState } from 'react';

import { Progress } from '@/components';
import { PRICE_ID_ENTERPRISE, PRICE_ID_PROFESSIONAL } from '@/config';
import { useAuth } from '@/hooks';

export const MyPlan = () => {
  const { user } = useAuth();
  const [totalDocsCreated, setTotalDocsCreated] = useState<number>(0);
  const [maxDocs, setMaxDocs] = useState<number>(5);
  const [planTitle, setPlanTitle] = useState<string>('Starter');

  useEffect(() => {
    console.log(user);
    setTotalDocsCreated(user?.documents?.length || 0);

    if (user?.subscription) {
      if (user?.subscription?.priceId === PRICE_ID_PROFESSIONAL) {
        setMaxDocs(100);
        setPlanTitle('Professional');
      }
      if (user?.subscription?.priceId === PRICE_ID_ENTERPRISE) {
        setMaxDocs(500);
        setPlanTitle('Enterprice');
      }
    }
  }, []);

  return (
    <div className='flex flex-col gap-4 p-12 pt-16'>
      <h1 className='text-lg text-slate-700'>
        Your current plan is: <span className='text-3xl'>{planTitle}</span>
      </h1>
      <div className='mt-4 w-full'>
        <p className='float-right pb-2 text-sm text-slate-500'>
          {totalDocsCreated} / {maxDocs} docs created
        </p>
        <Progress value={(totalDocsCreated / maxDocs) * 100} className='bg-slate-200' />
      </div>
    </div>
  );
};
