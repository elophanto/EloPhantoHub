import { loadStripe } from '@stripe/stripe-js'

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'

export const getStripe = () => {
  return loadStripe(stripePublicKey)
}
