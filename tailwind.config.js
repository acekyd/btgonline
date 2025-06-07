module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'btg-bg-light': '#FAF8F6', // Light background (from design)
        'btg-bg-dark': '#e39f17',  // Dark brown background (from design)
        'btg-text-light': '#18120B', // Light mode text (from design)
        'btg-text-dark': '#F5EBDD',  // Dark mode text (from design)
      }
    }
  },
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue'
  ]
} 