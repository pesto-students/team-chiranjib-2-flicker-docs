import { loadStripe } from '@stripe/stripe-js';

import { STRIPE_PUBLISHABLE_KEY } from '@/config';

let stripePromise: any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
