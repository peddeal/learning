import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
    server: { port: Number(process.env.PORT) || 3000, host: '0.0.0.0' },
     ssr: true,
  nitro: {
    preset: 'node-server'
  },
  // สำหรับ Azure Web App
  app: {
    
    baseURL: '/',      // path ของ app
  },
   plugins: ['~/plugins/vuetify'],
  //...
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})