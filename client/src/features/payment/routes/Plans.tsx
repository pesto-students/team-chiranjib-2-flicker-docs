import { Header } from '@/components';

import { PlanCards } from '../components/PlanCards';

export const Plans = () => {
  return (
    <>
      <Header />
      <section className='dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-8'>
          <div className='mx-auto mb-8 max-w-screen-md text-center lg:mb-12'>
            <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
              Pricing
            </h2>
            <p className='mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl'>
              Unleash collaboration, powered by AI.
            </p>
          </div>
          <div className='space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10'>
            <PlanCards />
          </div>
        </div>
      </section>
    </>
  );
};
