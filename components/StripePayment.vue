<template>
  <div class="stripe-payment">
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Processing payment...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="success" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-green-900 mb-2">Payment Successful!</h3>
      <p class="text-green-700 mb-4">Your subscription has been activated.</p>
      <button @click="$emit('success')" class="btn-primary">
        Continue to Dashboard
      </button>
    </div>

    <div v-else>
      <!-- Payment Summary -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-gray-900 mb-2">Payment Summary</h3>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">{{ customerType === 'individual' ? 'ProGrowth Premium' : 'ProGrowth Business' }} (Annual)</span>
          <span class="font-bold text-gray-900">500 EGP</span>
        </div>
      </div>

      <!-- Stripe Elements -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
          <div id="card-element" class="p-3 border border-gray-300 rounded-lg bg-white">
            <!-- Stripe Elements will create form elements here -->
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="!stripe || processing"
          :class="processing ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'"
          class="w-full py-3 text-lg"
        >
          {{ processing ? 'Processing...' : 'Pay 500 EGP' }}
        </button>
      </form>

      <!-- Security Notice -->
      <div class="mt-4 text-center text-sm text-gray-500">
        <div class="flex items-center justify-center mb-2">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secured by Stripe
        </div>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps({
  customerType: {
    type: String,
    required: true,
    validator: (value) => ['individual', 'company'].includes(value)
  },
  customerInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['success', 'error'])

const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)
const loading = ref(true)
const processing = ref(false)
const error = ref('')
const success = ref(false)
const clientSecret = ref('')

onMounted(async () => {
  try {
    // Initialize Stripe
    stripe.value = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here')
    
    if (!stripe.value) {
      throw new Error('Failed to load Stripe')
    }

    // Create payment intent
    const response = await $fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      body: {
        amount: 500,
        currency: 'egp',
        customerType: props.customerType,
        customerInfo: props.customerInfo
      }
    })

    clientSecret.value = response.clientSecret

    // Create Stripe Elements
    elements.value = stripe.value.elements()
    cardElement.value = elements.value.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
      },
    })

    cardElement.value.mount('#card-element')
    loading.value = false

  } catch (err) {
    console.error('Stripe initialization error:', err)
    error.value = 'Failed to initialize payment system'
    loading.value = false
  }
})

const handleSubmit = async () => {
  if (!stripe.value || !cardElement.value) return

  processing.value = true
  error.value = ''

  try {
    // Confirm payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret.value, {
      payment_method: {
        card: cardElement.value,
        billing_details: {
          name: props.customerInfo.name,
          email: props.customerInfo.email,
        },
      }
    })

    if (stripeError) {
      error.value = stripeError.message
    } else if (paymentIntent.status === 'succeeded') {
      // Confirm payment on backend
      await $fetch('/api/payments/confirm-payment', {
        method: 'POST',
        body: {
          paymentIntentId: paymentIntent.id,
          customerType: props.customerType,
          customerId: props.customerInfo.id
        }
      })

      success.value = true
      emit('success')
    }

  } catch (err) {
    console.error('Payment error:', err)
    error.value = 'Payment failed. Please try again.'
  } finally {
    processing.value = false
  }
}
</script>