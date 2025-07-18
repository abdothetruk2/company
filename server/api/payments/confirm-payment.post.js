import Stripe from 'stripe'
import { connectDB } from '../utils/db.js'
import User from '../models/User.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    
    const body = await readBody(event)
    const { paymentIntentId, customerType, customerId } = body

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      // Update subscription status in database
      if (customerType === 'individual') {
        await User.findByIdAndUpdate(customerId, {
          subscription: {
            status: 'active',
            plan: 'premium',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            paymentIntentId: paymentIntentId,
            amount: paymentIntent.amount / 100
          }
        })
      }

      return {
        success: true,
        message: 'Payment confirmed and subscription activated'
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Payment not completed'
      })
    }

  } catch (error) {
    console.error('Payment confirmation failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to confirm payment'
    })
  }
})