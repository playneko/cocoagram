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
  nitro : {
    preset : 'github-pages',
    routeRules: {
      '/api/**': {
        cors: true,
        proxy: 'https://api.playneko.com/**'
      }
    }
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
    '@nuxtjs/device'
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
      apiCocoaSignInAuth: "https://api.playneko.com/api/cocoa/sign/auth",
      apiCocoaStoryList: "https://api.playneko.com/api/cocoa/story/list",
      apiCocoaCommentList: "https://api.playneko.com/api/cocoa/comment/list",
      apiCocoaCommentWrite: "https://api.playneko.com/api/cocoa/comment/write",
      apiCocoaCommentDelete: "https://api.playneko.com/api/cocoa/comment/delete",
      apiCocoaLikeUp: "https://api.playneko.com/api/cocoa/like/up",
      apiCocoaDetailInfo: "https://api.playneko.com/api/cocoa/detail/info",
      apiCocoaDetailImage: "https://api.playneko.com/api/cocoa/detail/image",
      apiCocoaCompassList: "https://api.playneko.com/api/cocoa/compass/list",
      apiCocoaUploadImage: "https://api.playneko.com/file/cocoa/upload/image",
      apiCocoaProfileInfo: "https://api.playneko.com/api/cocoa/profile/info",
      apiCocoaProfileList: "https://api.playneko.com/api/cocoa/profile/list",
      apiCocoaProfileSave: "https://api.playneko.com/file/cocoa/profile/modify/save",
    }
  }
})
