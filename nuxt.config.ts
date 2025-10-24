import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'
  },

  app: {
    baseURL: '/', // path ของ app
  },

  plugins: ['~/plugins/vuetify'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    // i18n config
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en.json'
          },
          {
            code: 'th',
            name: 'ไทย',
            file: 'th.json'
          }
        ],
        defaultLocale: 'th',
        lazy: true,
        langDir: 'locales/',
        strategy: 'prefix_and_default'
      }
    ],

    // vuetify config
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
