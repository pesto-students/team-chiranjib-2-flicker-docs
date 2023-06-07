import { CheckCircle } from 'lucide-react';

import { Button, Header } from '@/components';

const TickIcon = () => <CheckCircle className='h-5' />;

const planOne = {
  heading: 'Starter',
  title: 'Best option for personal use.',
  price: '0',
  features: [
    {
      title: 'Upto 10 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 3 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};

const planTwo = {
  heading: 'Professional',
  title: 'Relevant for professional writers.',
  price: '25',
  features: [
    {
      title: 'Upto 100 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 10 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};

const planThree = {
  heading: 'Enterprise',
  title: 'Best for large scale uses.',
  price: '40',
  features: [
    {
      title: 'Upto 500 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 20 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};

type PlanProps = {
  plan: typeof planOne;
};

const SinglePlan = ({ plan }: PlanProps) => (
  <div className='mx-auto flex w-full flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow hover:shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8'>
    <h3 className='mb-4 text-2xl font-semibold'>{plan.heading}</h3>
    <p className='font-light text-gray-500 dark:text-gray-400 sm:text-lg'>{plan.title}</p>
    <div className='my-8 flex items-baseline justify-center'>
      <span className='mr-2 text-5xl font-extrabold'>${plan.price}</span>
      <span className='text-gray-500 dark:text-gray-400'>/month</span>
    </div>

    <ul className='mb-8 space-y-4 text-left'>
      {plan.features.map((feature) => (
        <li key={feature.title} className='flex items-center space-x-3'>
          {feature.icon}
          <span>{feature.title}</span>
        </li>
      ))}
    </ul>

    <Button> Choose Plan</Button>
  </div>
);

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
            <SinglePlan plan={planOne} />
            <SinglePlan plan={planTwo} />
            <SinglePlan plan={planThree} />
          </div>
        </div>
      </section>
    </>
  );
};
