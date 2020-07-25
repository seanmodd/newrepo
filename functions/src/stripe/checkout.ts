import Stripe from 'stripe';
import * as functions from 'firebase-functions';

import { catchErrors, getUID } from '../helpers';
import { stripe } from '../config';

const createCheckoutSession = async (
  uid: string,
  email: string,
  priceId: string
): Promise<Stripe.Checkout.Session> => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    client_reference_id: uid,
    customer_email: email,
    metadata: {
      firebaseUid: uid,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${
      functions.config().client.host
    }/account/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${functions.config().client.host}/account/billing/cancel`,
  });

  return session;
};

export const stripeCreateCheckoutSession = functions.https.onCall(
  async (
    data: { email: string; priceId: string },
    context: functions.https.CallableContext
  ) => {
    const uid = getUID(context);
    return catchErrors(createCheckoutSession(uid, data.email, data.priceId));
  }
);
