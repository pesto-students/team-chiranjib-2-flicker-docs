import { Service } from 'typedi';

import { UserModel } from '@models/users.model';

import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '@/config';

const stripe = new Stripe(STRIPE_SECRET_KEY, null);

@Service()
export class PaymentService {
  public async verifyPayment(email: string) {
    const findCustomerByEmail = async (email: string) => {
      try {
        const customer = await stripe.customers.list({
          email: email,
          limit: 1,
        });
        if (customer.data.length !== 0) {
          const stripeSub = await stripe.subscriptions.list({
            customer: customer.data[0].id,
          });
          return { custormer: customer.data[0], subscriptions: stripeSub.data };
        }
      } catch (e) {
        return e;
      }
    };
    const data = await findCustomerByEmail(email);

    const { id, amount, currency } = data.subscriptions[0].items.data[0].plan;
    const { id: subId, created, current_period_start, current_period_end, customer } = data.subscriptions[0];

    const newsubData = {
      subscriptionId: subId,
      customerId: customer,
      priceId: id,
      amount,
      currency,
      created,
      current_period_start,
      current_period_end,
    };

    const user = await UserModel.findOne({ email });
    user.subscription = newsubData;
    const response = await user.save();

    return response;
  }
}
