<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-amber-50 to-orange-100 dark:from-[#211C12] dark:via-amber-950 dark:to-orange-950 transition-all duration-500">
    <!-- Hero Section with Search -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 dark:from-amber-400/10 dark:to-orange-400/10">
      </div>
      <div class="relative max-w-7xl mx-auto px-6 py-16">
        <div class="text-center mb-12">
          <h1
            class="text-6xl font-black mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent animate-pulse">
            LATEST NEWS
          </h1>
          <p class="text-xl text-slate-600 dark:text-[#FAF8F6]/80 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the most exciting developments in sports
          </p>
        </div>

        <!-- Enhanced Search Bar -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            </div>
            <div class="relative">
              <input v-model="search" type="text" placeholder="Search for news, players, teams..."
                class="w-full px-6 py-4 text-lg rounded-2xl bg-white/80 dark:bg-[#211C12]/80 backdrop-blur-lg text-slate-800 dark:text-[#FAF8F6] placeholder:text-slate-500 dark:placeholder:text-[#FAF8F6]/60 border border-white/20 dark:border-amber-800/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-300 shadow-xl" />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
            'px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1',
            selectedCategory === cat
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-white/60 dark:bg-[#211C12]/60 backdrop-blur-lg text-slate-700 dark:text-[#FAF8F6] hover:bg-white/80 dark:hover:bg-[#211C12]/80 border border-white/30 dark:border-amber-800/30',
          ]">
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-6 pb-20">
      <!-- Featured Article -->
      <div v-if="featured" class="mb-20">
        <div class="relative group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500">
          </div>
          <div
            class="relative bg-white/80 dark:bg-[#211C12]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-amber-800/30">
            <div class="flex flex-col lg:flex-row">
              <div class="lg:w-3/5 p-8 lg:p-12">
                <div
                  class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm mb-6 shadow-lg">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  FEATURED
                </div>
                <h2 class="text-4xl lg:text-5xl font-black text-slate-800 dark:text-[#FAF8F6] mb-6 leading-tight">
                  {{ featured.title }}
                </h2>
                <p class="text-xl text-slate-600 dark:text-[#FAF8F6]/80 mb-8 leading-relaxed">
                  {{ featured.description }}
                </p>
                <NuxtLink :to="featured.path"
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-2xl hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Read Full Story
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                    </path>
                  </svg>
                </NuxtLink>
              </div>
              <div class="lg:w-2/5 relative overflow-hidden">
                <img :src="featured.image" :alt="featured.title"
                  class="w-full h-64 lg:h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent dark:lg:from-[#211C12]/10">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Updates -->
      <div class="mb-16">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-4xl font-black text-slate-800 dark:text-[#FAF8F6]">
            Recent Updates
          </h2>
          <div class="h-1 flex-1 ml-8 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(article, index) in paginatedArticles" :key="article.path" class="group relative"
            :style="{ animationDelay: `${index * 0.1}s` }"
            >
           <NuxtLink :to="article.path">
            <div
              class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>
            <div
              class="relative bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/30 dark:border-amber-800/30 transform hover:-translate-y-2 transition-all duration-400">
              <div v-if="article.image" class="relative h-48 overflow-hidden">
                <img :src="article.image" :alt="article.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div class="p-6">
                <h3
                  class="font-bold text-xl text-slate-800 dark:text-[#FAF8F6] mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {{ article.title }}
                </h3>
                <p class="text-slate-600 dark:text-[#FAF8F6]/80 line-clamp-3 leading-relaxed">
                  {{ article.description }}
                </p>
                <div class="mt-4 flex items-center text-sm text-slate-500 dark:text-[#FAF8F6]/60">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ article.date ? new Date(article.date).toLocaleDateString() : 'Recent' }}
                </div>
              </div>
            </div>
           </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Enhanced Pagination -->
      <div class="flex justify-center items-center gap-2">
        <button :disabled="page === 1" @click="page--"
          class="p-3 rounded-full bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg text-slate-700 dark:text-[#FAF8F6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg border border-white/30 dark:border-amber-800/30">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div class="flex gap-2 mx-4">
          <button v-for="p in Math.min(totalPages, 5)" :key="p" @click="page = p" :class="[
            'w-12 h-12 rounded-full font-bold transition-all duration-300 transform hover:scale-110',
            page === p
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg text-slate-700 dark:text-[#FAF8F6] hover:bg-amber-500 hover:text-white border border-white/30 dark:border-amber-800/30'
          ]">
            {{ p }}
          </button>
        </div>

        <button :disabled="page === totalPages" @click="page++"
          class="p-3 rounded-full bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg text-slate-700 dark:text-[#FAF8F6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg border border-white/30 dark:border-amber-800/30">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'

definePageMeta({
  layout: 'default',
})

interface NewsArticle {
  path: string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  tags?: string[];
}

const { data } = await useAsyncData('news', () =>
  queryCollection('content').all()
)
const allArticles = (data.value ?? []) as NewsArticle[]

// Sort by date descending in JS if needed
allArticles.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const search = ref('')
const categories = ['All', 'Match Results', 'Team Updates', 'Player Profiles']
const selectedCategory = ref('All')
const page = ref(1)
const pageSize = 9

const filteredArticles = computed(() => {
  let filtered = allArticles
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(a => a.tags?.includes(selectedCategory.value))
  }
  if (search.value) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(search.value.toLowerCase()) ||
      a.description.toLowerCase().includes(search.value.toLowerCase())
    )
  }
  return filtered
})

const featured = computed(() => filteredArticles.value[0])
const paginatedArticles = computed(() =>
  filteredArticles.value.slice(1 + (page.value - 1) * pageSize, 1 + page.value * pageSize)
)
const totalPages = computed(() =>
  Math.ceil(Math.max(0, filteredArticles.value.length - 1) / pageSize)
)

// Meta tags
useHead({
  title: 'Latest News - BTG Tournament',
  meta: [
    { name: 'description', content: 'Stay updated with the latest news, match results, team updates, and player profiles from the BTG Tournament. Get exclusive insights and breaking stories.' },
    { name: 'keywords', content: 'BTG news, tournament updates, match results, team news, player profiles, sports news, football tournament' },
    { property: 'og:title', content: 'Latest News - BTG Tournament' },
    { property: 'og:description', content: 'Stay updated with the latest news, match results, team updates, and player profiles from the BTG Tournament.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/stadium.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Latest News - BTG Tournament' },
    { name: 'twitter:description', content: 'Stay updated with the latest news, match results, team updates, and player profiles from the BTG Tournament.' },
    { name: 'twitter:image', content: '/stadium.jpg' }
  ]
})
</script>

<style scoped>
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:nth-child(odd) {
  animation: slideInUp 0.6s ease-out;
}

.group:nth-child(even) {
  animation: slideInUp 0.6s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>