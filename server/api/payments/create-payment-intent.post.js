import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { amount, currency = 'egp', customerType, customerInfo } = body

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents/piastres
      currency: currency.toLowerCase(),
      metadata: {
        customerType,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        ...(customerType === 'company' && { companyName: customerInfo.companyName })
      }
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }

  } catch (error) {
    console.error('Payment intent creation failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create payment intent'
    })
  }
})