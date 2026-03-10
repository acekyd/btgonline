<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Hero Section -->
    <section class="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <NuxtImg
          src="/stadium.jpg"
          alt="BTG Gaming Stadium"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#001D3D]/80 via-[#001D3D]/70 to-[#001D3D]/90"></div>
      </div>

      <!-- Hero content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div class="animate-slide-in-up">
          <span class="tag tag-red mb-6 inline-flex">The Community Esports Platform</span>
          <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-wide leading-none mb-4">
            BRAVO TRASHE<br />GAMING
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
            The Home of Competitive Gaming
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/creators" class="btn btn-primary text-base px-7 py-3">
              <Icon name="lucide:users" class="w-5 h-5" />
              Meet the Creators
            </NuxtLink>
            <NuxtLink to="/tournaments" class="btn btn-outline border-white text-white hover:bg-white hover:text-[#001D3D] text-base px-7 py-3">
              <Icon name="lucide:trophy" class="w-5 h-5" />
              View Tournaments
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Creators Section -->
    <section class="section bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-end justify-between mb-2">
          <div>
            <h2 class="section-title mb-1">FEATURED CREATORS</h2>
            <p class="text-gray-500 text-sm mb-6">The streamers and personalities behind the BTG community.</p>
          </div>
          <NuxtLink to="/creators" class="text-sm font-semibold text-[#E30613] hover:underline mb-7 flex-shrink-0 ml-4">
            View All Creators →
          </NuxtLink>
        </div>

        <!-- Loading skeleton -->
        <div v-if="pendingHome" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="card p-5 animate-pulse">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-14 h-14 rounded-full bg-gray-200"></div>
              <div class="h-5 bg-gray-200 rounded w-32"></div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-9 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        <!-- Creators grid -->
        <div v-else-if="featuredCreators && featuredCreators.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreatorCard
            v-for="creator in featuredCreators"
            :key="creator.id"
            :creator="creator"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16 text-gray-400">
          <Icon name="lucide:users" class="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No featured creators yet.</p>
        </div>
      </div>
    </section>

    <!-- Active Tournaments Section -->
    <section class="section bg-[#FAF8F6]">
      <div class="container mx-auto px-4">
        <div class="flex items-end justify-between mb-2">
          <div>
            <h2 class="section-title mb-1">ACTIVE TOURNAMENTS</h2>
            <p class="text-gray-500 text-sm mb-6">Currently running competitions across the BTG platform.</p>
          </div>
          <NuxtLink to="/tournaments" class="text-sm font-semibold text-[#E30613] hover:underline mb-7 flex-shrink-0 ml-4">
            View All Tournaments →
          </NuxtLink>
        </div>

        <!-- Loading skeleton -->
        <div v-if="pendingHome" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="card animate-pulse">
            <div class="h-40 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Tournaments grid -->
        <div v-else-if="activeTournaments && activeTournaments.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TournamentCard
            v-for="tournament in activeTournaments"
            :key="tournament.id"
            :tournament="tournament"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16 text-gray-400">
          <Icon name="lucide:trophy" class="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No active tournaments at the moment.</p>
        </div>
      </div>
    </section>

    <!-- Recent Champions Section -->
    <section class="section bg-white">
      <div class="container mx-auto px-4">
        <div class="mb-6">
          <h2 class="section-title mb-1">RECENT CHAMPIONS</h2>
          <p class="text-gray-500 text-sm">Latest season results across all tournaments.</p>
        </div>

        <!-- Loading skeleton -->
        <div v-if="pendingHome" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="card p-5 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div class="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Champions grid -->
        <div v-else-if="recentChampions && recentChampions.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="champion in recentChampions"
            :key="champion.id"
            :to="`/seasons/${champion.id}`"
            class="card hover-lift p-5 block"
          >
            <!-- Tournament label -->
            <span class="tag tag-navy text-[10px] mb-3">{{ champion.tournament_name }}</span>

            <!-- Season name -->
            <h3 class="font-black text-[#00152E] text-lg mb-4 leading-tight">{{ champion.season_name }}</h3>

            <!-- Champion -->
            <div class="flex items-start gap-2 mb-2">
              <div class="flex-shrink-0 mt-0.5">
                <Icon name="lucide:trophy" class="w-4 h-4 text-[#FFC107]" />
              </div>
              <div>
                <span class="text-xs text-gray-400 uppercase tracking-wide font-semibold block">Champion</span>
                <span class="font-bold text-[#FFC107]">{{ champion.winner_team_name ?? '—' }}</span>
              </div>
            </div>

            <!-- Runner-up -->
            <div class="flex items-start gap-2 mb-4">
              <div class="flex-shrink-0 mt-0.5">
                <Icon name="lucide:medal" class="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <span class="text-xs text-gray-400 uppercase tracking-wide font-semibold block">Runner-Up</span>
                <span class="font-medium text-gray-600">{{ champion.runner_up_team_name ?? '—' }}</span>
              </div>
            </div>

            <!-- Date -->
            <div v-if="champion.end_date" class="text-xs text-gray-400 border-t border-gray-100 pt-3">
              Ended {{ formatDate(champion.end_date) }}
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16 text-gray-400">
          <Icon name="lucide:calendar-x" class="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No recent champions yet.</p>
        </div>
      </div>
    </section>

    <!-- Community CTA Section -->
    <section class="section-lg bg-[#001D3D]">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-black text-white uppercase tracking-wide mb-4">
            JOIN THE COMMUNITY
          </h2>
          <p class="text-gray-300 text-lg mb-8">
            Follow us for the latest updates, tournament news, and highlights.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-white"
            >
              <Icon name="mdi:twitter" class="w-5 h-5" />
              Follow on Twitter
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
interface Creator {
  id: number
  display_name: string
  slug: string
  bio?: string | null
  avatar_url?: string | null
  twitch_url?: string | null
  youtube_url?: string | null
  tiktok_url?: string | null
  instagram_url?: string | null
  twitter_url?: string | null
  primary_stream_url?: string | null
  is_featured: number | boolean
}

interface Tournament {
  id: number
  name: string
  slug: string
  game_title: string
  format_type?: string | null
  status: 'active' | 'completed' | 'offseason'
  logo_url?: string | null
}

interface RecentChampion {
  id: number
  season_name: string
  tournament_name: string
  winner_team_name?: string | null
  runner_up_team_name?: string | null
  end_date?: string | null
}

interface HomeData {
  featuredCreators: Creator[]
  activeTournaments: Tournament[]
  recentChampions: RecentChampion[]
}

useHead({
  title: 'BTG — Bravo Trashe Gaming | The Home of Competitive Gaming',
  meta: [
    { name: 'description', content: 'BTG is the home of competitive gaming. Discover creators, follow tournaments, and explore season records.' },
    { name: 'keywords', content: 'BTG, Bravo Trashe Gaming, esports, tournaments, streamers, competitive gaming' },
  ],
})

const { data: homeData, pending: pendingHome } = await useAsyncData<{ data: HomeData }>(
  'home',
  () => $fetch('/api/home'),
  { default: () => ({ data: { featuredCreators: [], activeTournaments: [], recentChampions: [] } }) }
)

const featuredCreators = computed(() => homeData.value?.data?.featuredCreators ?? [])
const activeTournaments = computed(() => homeData.value?.data?.activeTournaments ?? [])
const recentChampions = computed(() => homeData.value?.data?.recentChampions ?? [])

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}
</script>
