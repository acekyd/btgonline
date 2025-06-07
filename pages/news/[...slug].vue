<script lang="ts" setup>
const route = useRoute()

// Add type definition for the page data
interface NewsArticle {
  title: string
  description?: string
  date?: string
  image?: string
  tags?: string[]
  author?: string
  readTime?: number
  path: string
}

// Update the page data type with proper type casting
const { data: page } = await useAsyncData<NewsArticle | null>(route.path, async () => {
  const result = await queryCollection('content').path(`/news/${route.params.slug}`).first()
  return result as NewsArticle | null
})

// Update related articles type with proper type casting
const { data: relatedArticles } = await useAsyncData<NewsArticle[]>('related-news', async () => {
  const results = await queryCollection('content').limit(3).all()
  return results as NewsArticle[]
})

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Recent'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return ''
})

const shareArticle = (platform: 'twitter' | 'facebook' | 'linkedin') => {
  const url = encodeURIComponent(shareUrl.value)
  const title = encodeURIComponent(page.value?.title || '')
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  }
  
  if (process.client) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }
}

console.log(page.value)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-amber-50 to-orange-100 dark:from-[#211C12] dark:via-amber-950 dark:to-orange-950 transition-all duration-500">
    <template v-if="page">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 dark:from-amber-400/10 dark:to-orange-400/10"></div>
        
        <!-- Featured Image Background -->
        <div v-if="page.image" class="absolute inset-0">
          <img :src="page.image" :alt="page.title" class="w-full h-full object-cover opacity-20 dark:opacity-10" />
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#211C12] dark:via-[#211C12]/80"></div>
        </div>
        
        <div class="relative max-w-4xl mx-auto px-6 py-16">
          <!-- Back Navigation -->
          <div class="mb-8">
            <NuxtLink to="/news" 
              class="inline-flex items-center px-4 py-2 rounded-full bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg text-slate-700 dark:text-[#FAF8F6] hover:bg-amber-500 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg border border-white/30 dark:border-amber-800/30">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to News
            </NuxtLink>
          </div>

          <!-- Article Header -->
          <div class="text-center mb-12">
            <!-- Category Badge -->
            <div v-if="page.tags && page.tags.length > 0" class="mb-6">
              <span class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm shadow-lg">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {{ page.tags[0] }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
              {{ page.title }}
            </h1>

            <!-- Description -->
            <p v-if="page.description" class="text-xl text-slate-600 dark:text-[#FAF8F6]/80 max-w-3xl mx-auto leading-relaxed mb-8">
              {{ page.description }}
            </p>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center justify-center gap-6 text-slate-500 dark:text-[#FAF8F6]/60">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ formatDate(page.date) }}
              </div>
              <div v-if="page.author" class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {{ page.author }}
              </div>
              <div v-if="page.readTime" class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                {{ page.readTime }} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="max-w-4xl mx-auto px-6 pb-20">
        <!-- Featured Image -->
        <div v-if="page.image" class="mb-12">
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div class="relative bg-white/80 dark:bg-[#211C12]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-amber-800/30">
              <img :src="page.image" :alt="page.title" class="w-full h-64 md:h-96 object-cover" />
            </div>
          </div>
        </div>

        <!-- Article Content -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5 rounded-3xl blur-3xl"></div>
          <article class="relative bg-white/80 dark:bg-[#211C12]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-amber-800/30">
            <div class="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:text-slate-800 dark:prose-headings:text-[#FAF8F6]
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-slate-700 dark:prose-p:text-[#FAF8F6]/90 prose-p:leading-relaxed
              prose-strong:text-amber-600 dark:prose-strong:text-amber-400
              prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-amber-950/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-code:bg-amber-100 dark:prose-code:bg-amber-950/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-amber-700 dark:prose-code:text-amber-300">
              <ContentRenderer :value="page" />
            </div>
          </article>
        </div>

        <!-- Share Buttons -->
        <div class="mt-12 text-center">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-[#FAF8F6] mb-6">Share This Article</h3>
          <div class="flex justify-center gap-4">
            <button @click="shareArticle('twitter')" 
              class="p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button @click="shareArticle('facebook')" 
              class="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button @click="shareArticle('linkedin')" 
              class="p-4 rounded-full bg-blue-700 text-white hover:bg-blue-800 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Related Articles -->
        <div v-if="relatedArticles && relatedArticles.length > 0" class="mt-20">
          <div class="flex items-center justify-between mb-12">
            <h2 class="text-4xl font-black text-slate-800 dark:text-[#FAF8F6]">
              Related Articles
            </h2>
            <div class="h-1 flex-1 ml-8 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(article, index) in relatedArticles.slice(0, 3)" :key="article.path" 
              class="group relative" :style="{ animationDelay: `${index * 0.1}s` }">
              <NuxtLink :to="article.path">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative bg-white/70 dark:bg-[#211C12]/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/30 dark:border-amber-800/30 transform hover:-translate-y-2 transition-all duration-400">
                  <div v-if="article.image" class="relative h-48 overflow-hidden">
                    <img :src="article.image" :alt="article.title" 
                      class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div class="p-6">
                    <h3 class="font-bold text-xl text-slate-800 dark:text-[#FAF8F6] mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {{ article.title }}
                    </h3>
                    <p class="text-slate-600 dark:text-[#FAF8F6]/80 line-clamp-3 leading-relaxed">
                      {{ article.description }}
                    </p>
                    <div class="mt-4 flex items-center text-sm text-slate-500 dark:text-[#FAF8F6]/60">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {{ formatDate(article.date) }}
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </main>
    </template>

    <!-- 404 State -->
    <template v-else>
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-3xl blur-2xl"></div>
            <div class="relative bg-white/80 dark:bg-[#211C12]/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-amber-800/30">
              <div class="text-8xl font-black text-amber-500 mb-6">404</div>
              <h1 class="text-4xl font-black text-slate-800 dark:text-[#FAF8F6] mb-4">Article Not Found</h1>
              <p class="text-xl text-slate-600 dark:text-[#FAF8F6]/80 mb-8">The article you're looking for doesn't exist or has been moved.</p>
              <NuxtLink to="/news" 
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-2xl hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to News
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

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

/* Enhanced prose styling for better readability */
.prose {
  --tw-prose-body: #334155;
  --tw-prose-headings: #1e293b;
  --tw-prose-links: #d97706;
  --tw-prose-bold: #d97706;
  --tw-prose-counters: #64748b;
  --tw-prose-bullets: #94a3b8;
  --tw-prose-hr: #cbd5e1;
  --tw-prose-quotes: #0f172a;
  --tw-prose-quote-borders: #f59e0b;
  --tw-prose-captions: #475569;
  --tw-prose-code: #b45309;
  --tw-prose-pre-code: #f1f5f9;
  --tw-prose-pre-bg: #0f172a;
  --tw-prose-th-borders: #cbd5e1;
  --tw-prose-td-borders: #e2e8f0;
}

.dark .prose {
  --tw-prose-body: #cbd5e1;
  --tw-prose-headings: #ffffff;
  --tw-prose-links: #fbbf24;
  --tw-prose-bold: #fbbf24;
  --tw-prose-counters: #94a3b8;
  --tw-prose-bullets: #64748b;
  --tw-prose-hr: #475569;
  --tw-prose-quotes: #f1f5f9;
  --tw-prose-quote-borders: #f59e0b;
  --tw-prose-captions: #cbd5e1;
  --tw-prose-code: #fcd34d;
  --tw-prose-pre-code: #e2e8f0;
  --tw-prose-pre-bg: #1e293b;
  --tw-prose-th-borders: #475569;
  --tw-prose-td-borders: #475569;
}
</style>