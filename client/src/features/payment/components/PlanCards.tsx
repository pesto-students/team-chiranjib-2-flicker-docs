import { toast } from 'react-hot-toast';

import { Button } from '@/components';
import { PRICE_ID_ENTERPRISE, PRICE_ID_PROFESSIONAL, URL } from '@/config';
import { useAuth } from '@/hooks';

import getStripe from '../config/index';
import { EnterprisePlan, ProfessionalPlan, StarterPlan } from '../utils/constants';

type PlanProps = {
  plan: typeof StarterPlan;
  handleCheckout: (plan: string) => void;
  selected?: boolean;
};

const SinglePlan = ({ plan, handleCheckout, selected }: PlanProps) => (
  <div
    className={`mx-auto flex w-full flex-col rounded-lg ${
      selected
        ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5'
        : 'bg-gray-100 p-[1px]'
    }   text-center text-gray-900 shadow hover:shadow-lg`}
  >
    <div className='flex h-full flex-col rounded-lg bg-white p-6'>
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

      {plan.heading !== 'Starter' && (
        <Button onClick={() => handleCheckout(plan.heading)}>
          {selected ? 'Your current plan' : 'Choose Plan'}
        </Button>
      )}
    </div>
  </div>
);

export const PlanCards = () => {
  const { user } = useAuth();

  async function handleCheckout(plan: string) {
    if (user?.subscription?.current_period_end) {
      toast.error('You are already subscribed to a plan');
      return;
    }

    let PRICING_PLAN: string;

    switch (plan) {
      case 'Professional':
        PRICING_PLAN = PRICE_ID_PROFESSIONAL;
        break;

      case 'Enterprise':
        PRICING_PLAN = PRICE_ID_ENTERPRISE;
        break;

      default:
        PRICING_PLAN = PRICE_ID_PROFESSIONAL;
        break;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: PRICING_PLAN,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `${URL}/plans?success=true`,
      cancelUrl: `${URL}/plans/cancel`,
      customerEmail: user?.email,
    });
    console.warn(error.message);
  }

  console.log(user);
  return (
    <>
      <SinglePlan plan={StarterPlan} handleCheckout={handleCheckout} />
      <SinglePlan
        plan={ProfessionalPlan}
        handleCheckout={handleCheckout}
        selected={user?.subscription?.priceId === PRICE_ID_PROFESSIONAL}
      />
      <SinglePlan
        plan={EnterprisePlan}
        handleCheckout={handleCheckout}
        selected={user?.subscription?.priceId === PRICE_ID_ENTERPRISE}
      />
    </>
  );
};
