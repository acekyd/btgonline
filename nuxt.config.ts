// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'dark',
  },
  nitro: {
    experimental: { wasm: true },
    externals: { external: ['better-sqlite3'] }
  },
  runtimeConfig: {
    sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    adminEmail: process.env.ADMIN_EMAIL || '',
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
    databaseUrl: process.env.DATABASE_URL || 'file:./data/dev.db',
    public: {}
  }
})
