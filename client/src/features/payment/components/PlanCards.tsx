import { Button } from '@/components';

import { EnterprisePlan, ProfessionalPlan, StarterPlan } from '../utils/constants';

type PlanProps = {
  plan: typeof StarterPlan;
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

export const PlanCards = () => {
  return (
    <>
      <SinglePlan plan={StarterPlan} />
      <SinglePlan plan={ProfessionalPlan} />
      <SinglePlan plan={EnterprisePlan} />
    </>
  );
};
