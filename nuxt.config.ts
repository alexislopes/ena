// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/ena/' // baseURL: '/<repository>/'
  },
  ssr: false,
  modules: [
    // ...
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/supabase',
    '@vueuse/nuxt'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
