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
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
        <p class="text-gray-600">Last updated: January 2025</p>
      </div>

      <div class="card p-8 space-y-6">
        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-900">Personal Information</h4>
              <p class="text-gray-700">We collect information you provide directly, including name, email, age, gender, university, and ID verification documents.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Assessment Data</h4>
              <p class="text-gray-700">Your responses to personality, knowledge, and soft skills assessments are collected and analyzed to provide career recommendations.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Usage Information</h4>
              <p class="text-gray-700">We collect information about how you use our platform, including pages visited, features used, and time spent on the platform.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Provide personalized career assessments and recommendations</li>
            <li>Match you with relevant job opportunities</li>
            <li>Improve our services and develop new features</li>
            <li>Send you relevant updates and notifications</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h3>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-900">With Your Consent</h4>
              <p class="text-gray-700">We share your profile with potential employers only with your explicit consent when you apply for jobs through our platform.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Aggregated Data</h4>
              <p class="text-gray-700">We may share anonymized, aggregated data for research and industry insights without identifying individual users.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Service Providers</h4>
              <p class="text-gray-700">We work with trusted third-party service providers who help us operate our platform, subject to strict confidentiality agreements.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h3>
          <p class="text-gray-700 mb-3">We implement industry-standard security measures to protect your information:</p>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>End-to-end encryption for sensitive data</li>
            <li>Secure servers with regular security audits</li>
            <li>Access controls and authentication protocols</li>
            <li>Regular security training for our team</li>
          </ul>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h3>
          <p class="text-gray-700 mb-3">You have the right to:</p>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and associated data</li>
            <li>Export your data in a portable format</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h3>
          <p class="text-gray-700">We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser.</p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h3>
          <p class="text-gray-700">We retain your information for as long as your account is active or as needed to provide services. Assessment results are kept for 5 years to track career progress, unless you request deletion.</p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">8. International Transfers</h3>
          <p class="text-gray-700">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.</p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h3>
          <p class="text-gray-700">Our services are not intended for users under 16. We do not knowingly collect personal information from children under 16.</p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h3>
          <p class="text-gray-700">
            For privacy-related questions or to exercise your rights, contact us at:
            <br><strong>Email:</strong> privacy@progrowth.com
            <br><strong>Address:</strong> ProGrowth Privacy Team, Cairo, Egypt
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
  title: 'Privacy Policy - ProGrowth'
})
</script>