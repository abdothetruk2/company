// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/scroll-animations.css',
    '~/assets/css/page-transitions.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    public: {
      apiBase: '/api'
    }
  },
  app: {
    head: {
      title: 'ProGrowth - Discover Your Career Fit or Hire Smarter',
      meta: [
        { name: 'description', content: 'Career development platform with assessments and smart hiring solutions' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  plugins: [
    '~/plugins/scrollAnimation.js',
    '~/plugins/pageTransition.client.js'
  ],
  imports: {
    dirs: ['stores']
  } 
})