<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">PG</span>
          </div>
          <h1 class="ml-3 text-2xl font-bold text-gray-900">ProGrowth</h1>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h2>
        <p class="text-gray-600">Last updated: January 2025</p>
      </div>

      <div class="card p-8 space-y-6">
        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
          <p class="text-gray-700">
            By accessing and using ProGrowth services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h3>
          <p class="text-gray-700 mb-3">
            ProGrowth provides career assessment and development services including:
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Personality and interest assessments (MBTI + RIASEC)</li>
            <li>Knowledge and skills evaluation</li>
            <li>Soft skills and aptitude testing</li>
            <li>AI-powered career recommendations</li>
            <li>Job matching services</li>
            <li>Course recommendations and discounts</li>
          </ul>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Provide accurate and truthful information</li>
            <li>Complete assessments honestly</li>
            <li>Maintain confidentiality of account credentials</li>
            <li>Use services for legitimate career development purposes</li>
          </ul>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">4. Payment Terms</h3>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-900">Individual Subscriptions:</h4>
              <p class="text-gray-700">Annual subscription: 500 EGP</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Business Subscriptions:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Startups (1-10 employees): 10,000 EGP annually</li>
                <li>SMEs (11-200 employees): 25,000 EGP annually</li>
                <li>Large companies (200+ employees): 45,000 EGP annually</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">5. Privacy and Data Protection</h3>
          <p class="text-gray-700">
            We are committed to protecting your privacy. All assessment results and personal information are encrypted and stored securely. We do not share individual data with third parties without explicit consent.
          </p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">6. Refund Policy</h3>
          <p class="text-gray-700">
            Refunds are available within 7 days of subscription for individual users and within 30 days for business clients, subject to terms and conditions.
          </p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">7. Contact Information</h3>
          <p class="text-gray-700">
            For questions about these terms, please contact us at legal@progrowth.com
          </p>
        </section>
      </div>

      <div class="text-center mt-8">
        <NuxtLink to="/" class="btn-secondary">
          Return to Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Terms and Conditions - ProGrowth'
})
</script>