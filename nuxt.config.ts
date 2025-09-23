// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/scripts'
  ],
  ui: {
    fonts: false,
  },

  colorMode: {
    classSuffix: '', // 在 dark 或 light 类名后面添加 -mode 后缀
    storageKey: 'tool-theme-mode' // 存储颜色模式的键名，用于在本地存储中存储颜色模式的值
  },

  nitro: {
    devProxy: {
      '/api_v1': {
        target: 'http://127.0.0.1:8083/',
        prependPath: true,
        changeOrigin: true,
      },
      '/ghs': {
        target: 'https://gh.flyinbug.top/gh/',
        prependPath: false,
        changeOrigin: true,
      }
    },
  },
})