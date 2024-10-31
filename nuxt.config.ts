import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  app : {
    baseURL : '/',
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Damion&display=swap' }
      ],
      meta: [
        { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
      ]
    }
  },
  css: [
    "~/assets/css/common.css"
  ],
  plugins: [
    "plugins/firebase.client.ts"
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'dayjs-nuxt',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_FIREBASE_API_KRY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      // API URL
      apiCocoaSignInAuth: "http://localhost:3100/api/cocoa/sign/auth",
      apiCocoaStoryList: "http://localhost:3100/api/cocoa/story/list",
      apiCocoaCommentList: "http://localhost:3100/api/cocoa/comment/list",
      apiCocoaCommentWrite: "http://localhost:3100/api/cocoa/comment/write",
      apiCocoaCommentDelete: "http://localhost:3100/api/cocoa/comment/delete",
      apiCocoaLikeUp: "http://localhost:3100/api/cocoa/like/up",
      apiCocoaDetailInfo: "http://localhost:3100/api/cocoa/detail/info",
      apiCocoaDetailImage: "http://localhost:3100/api/cocoa/detail/image",
    }
  }
})
