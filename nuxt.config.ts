// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2,
        },
        highlight: {
          theme: 'github-dark',
        }
      }
    }
  },
  components: [
    {
      path: '~/news/[...slug].vue',
      prefix: 'content',
      pathPrefix: false,
    },
  ],
  colorMode: {
    preference: 'light',
    fallback: 'dark',
  }
})