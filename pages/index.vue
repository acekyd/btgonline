<template>
  <div class="min-h-screen bg-white">

    <!-- Hero Section - Featured Content -->
    <section class="relative">
      <!-- Blue gradient overlay on left -->
      <div class="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#001D3D] via-[#001D3D]/80 to-transparent z-10">
      </div>

      <!-- Background Image -->
      <div class="absolute inset-0">
        <NuxtImg src="/stadium.jpg" alt="BTG Gaming" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      <div class="relative z-20 container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-8 min-h-[500px] py-12 lg:py-20">
          <!-- Left: Featured Content -->
          <div class="flex flex-col justify-center">
            <span class="tag tag-red w-fit mb-4">Featured</span>
            <p class="text-xs text-gray-300 uppercase tracking-wider mb-2">
              {{ formatDate(new Date()) }} | BTG NEWS
            </p>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              BTG Pro Clubs League Season 5 Kicks Off This February
            </h1>
            <p class="text-gray-200 text-lg mb-6 max-w-lg">
              Get ready for the most competitive season yet. Sign-ups are now open for all skill levels.
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/tournament" class="btn btn-primary">
                <UIcon name="i-heroicons-trophy" class="w-4 h-4" />
                Learn More
              </NuxtLink>
              <a href="https://discord.gg/HF7WAkJ4" target="_blank" class="btn btn-white">
                <UIcon name="i-simple-icons-discord" class="w-4 h-4" />
                Join Discord
              </a>
            </div>
          </div>

          <!-- Right: Secondary Card -->
          <div class="hidden lg:flex items-end justify-end">
            <div class="feature-banner max-w-sm">
              <span class="tag tag-navy mb-3">Announcement</span>
              <h3 class="feature-banner-title mb-2">New Streamers Joining BTG!</h3>
              <p class="text-[#00152E]/80 mb-4">
                Three talented content creators are joining our stream team.
              </p>
              <NuxtLink to="/teams" class="text-sm font-bold text-[#00152E] hover:underline">
                Meet the team →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access Ribbon -->
    <section class="bg-[#F4F6F8] border-y border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center gap-2 md:gap-6 py-4 overflow-x-auto">
          <NuxtLink v-for="item in quickAccess" :key="item.name" :to="item.path"
            class="flex flex-col items-center gap-1.5 px-4 py-2 hover:bg-white rounded-lg transition-colors group min-w-[80px]">
            <div
              class="w-10 h-10 rounded-full bg-white group-hover:bg-[#00152E] flex items-center justify-center transition-colors shadow-sm">
              <UIcon :name="item.icon" class="w-5 h-5 text-[#00152E] group-hover:text-white transition-colors" />
            </div>
            <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">{{ item.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Upcoming Streams Section -->
    <section class="section bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">Upcoming Streams</h2>
          <NuxtLink to="/streams" class="text-sm font-semibold text-[#E30613] hover:underline">
            See All →
          </NuxtLink>
        </div>

        <!-- Stream tabs -->
        <div class="flex items-center gap-2 mb-6">
          <button v-for="tab in streamTabs" :key="tab" @click="activeTab = tab" :class="[
            'px-4 py-2 text-sm font-semibold rounded-full transition-all',
            activeTab === tab
              ? 'bg-[#00152E] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]">
            {{ tab }}
          </button>
        </div>

        <!-- Stream cards scroll -->
        <div class="scroll-container">
          <div v-for="stream in upcomingStreams" :key="stream.id" class="match-card">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-gray-400 font-medium">{{ stream.date }}</span>
              <span v-if="stream.isLive" class="live-badge">
                <span class="live-dot"></span>
                Live
              </span>
              <span v-else class="text-xs text-gray-400">{{ stream.time }}</span>
            </div>

            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                :style="{ background: stream.streamerColor }">
                {{ stream.streamerInitials }}
              </div>
              <div>
                <div class="font-bold text-[#00152E]">{{ stream.streamer }}</div>
                <div class="text-xs text-gray-500">{{ stream.game }}</div>
              </div>
            </div>

            <div class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ stream.title }}
            </div>

            <a :href="stream.link" target="_blank"
              class="flex items-center gap-2 text-sm font-semibold text-[#E30613] hover:underline">
              <UIcon name="i-heroicons-play" class="w-4 h-4" />
              Watch on Twitch
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- BTG Leaders Section -->
    <section class="section bg-[#F4F6F8]">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">BTG Leaders</h2>
          <NuxtLink to="/teams" class="text-sm font-semibold text-[#E30613] hover:underline">
            All Streamers →
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="streamer in streamerLeaders" :key="streamer.id" class="stat-card">
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="stat-label">{{ streamer.stat.label }}</span>
                <div class="stat-number">{{ streamer.stat.value }}</div>
              </div>
              <div class="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                :style="{ background: streamer.color }">
                {{ streamer.initials }}
              </div>
            </div>

            <div class="border-t border-white/10 pt-3">
              <div class="font-bold text-white text-lg">{{ streamer.name }}</div>
              <div class="text-gray-400 text-sm">{{ streamer.role }}</div>
            </div>

            <!-- Sub-stats -->
            <div class="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
              <div v-for="sub in streamer.subStats" :key="sub.label" class="text-center">
                <div class="text-white font-bold">{{ sub.value }}</div>
                <div class="text-[10px] text-gray-500 uppercase">{{ sub.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Column: News + Standings -->
    <section class="section bg-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Latest News -->
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-6">
              <h2 class="section-title mb-0">Latest BTG News</h2>
              <NuxtLink to="/news" class="text-sm font-semibold text-[#E30613] hover:underline">
                All News →
              </NuxtLink>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <article v-for="article in latestNews" :key="article.slug" class="card group cursor-pointer">
                <div class="aspect-video bg-gray-100 relative overflow-hidden">
                  <NuxtImg v-if="article.image" :src="article.image" :alt="article.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div v-else
                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#001D3D] to-[#003566]">
                    <UIcon name="i-heroicons-newspaper" class="w-12 h-12 text-white/30" />
                  </div>
                  <span class="tag tag-red absolute top-3 left-3">{{ article.category }}</span>
                </div>
                <div class="p-4">
                  <p class="text-xs text-gray-400 mb-2">{{ article.date }}</p>
                  <h3 class="font-bold text-[#00152E] mb-2 line-clamp-2 group-hover:text-[#E30613] transition-colors">
                    {{ article.title }}
                  </h3>
                  <p class="text-sm text-gray-500 line-clamp-2">{{ article.excerpt }}</p>
                </div>
              </article>
            </div>
          </div>

          <!-- Team Standings -->
          <div>
            <div class="flex items-center justify-between mb-6">
              <h2 class="section-title mb-0">Standings</h2>
              <NuxtLink to="/tournament" class="text-sm font-semibold text-[#E30613] hover:underline">
                Full Table →
              </NuxtLink>
            </div>

            <div class="card overflow-hidden">
              <table class="standings-table w-full">
                <thead>
                  <tr>
                    <th class="w-10">#</th>
                    <th>Team</th>
                    <th class="text-center w-12">W</th>
                    <th class="text-center w-12">D</th>
                    <th class="text-center w-12">L</th>
                    <th class="text-center w-12">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(team, index) in standings" :key="team.id">
                    <td class="font-bold text-gray-400">{{ index + 1 }}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold"
                          :style="{ background: team.color }">
                          {{ team.abbr }}
                        </div>
                        <span class="font-medium">{{ team.name }}</span>
                      </div>
                    </td>
                    <td class="text-center">{{ team.wins }}</td>
                    <td class="text-center">{{ team.draws }}</td>
                    <td class="text-center">{{ team.losses }}</td>
                    <td class="text-center font-bold">{{ team.points }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community CTA -->
    <section class="section-lg bg-[#001D3D]">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-4">
            Join the BTG Community
          </h2>
          <p class="text-gray-300 text-lg mb-8">
            You don't need to be pro to feel the thrill. Join thousands of gamers in the most welcoming esports
            community.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://discord.gg/HF7WAkJ4" target="_blank"
              class="btn bg-[#5865F2] text-white hover:bg-[#4752C4]">
              <UIcon name="i-simple-icons-discord" class="w-5 h-5" />
              Join Discord
            </a>
            <a href="https://x.com/BTGOnline" target="_blank"
              class="btn btn-outline border-white text-white hover:bg-white hover:text-[#001D3D]">
              <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
              Follow Us
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { StreamersDoc, Streamer } from '@/types/streamer';

useHead({
  title: 'BTG - Bravo Trashe Gaming | Community Esports',
  meta: [
    { name: 'description', content: 'BTG is where casual meets competitive. Join the most fun, welcoming community for everyday gamers.' },
    { name: 'keywords', content: 'esports, gaming community, BTG, tournaments, streamers, FIFA, Pro Clubs' }
  ]
});

const activeTab = ref('All Streams');
const streamTabs = ['All Streams', 'BPCL', 'BPCC'];

const quickAccess = [
  { name: 'Schedule', path: '/streams', icon: 'i-heroicons-calendar' },
  { name: 'Fantasy', path: '/tournament', icon: 'i-heroicons-star' },
  { name: 'Shop', path: '/shop', icon: 'i-heroicons-shopping-bag' },
  { name: 'News', path: '/news', icon: 'i-heroicons-newspaper' },
  { name: 'Discord', path: 'https://discord.gg/HF7WAkJ4', icon: 'i-simple-icons-discord' },
];

// Fetch streamers using Nuxt Content v3 collection API
const { data: streamersDoc } = await useAsyncData<StreamersDoc>(
  'streamers',
  () => queryCollection('streamers').first() as Promise<StreamersDoc>
);

// Fallback streamer data in case collection fails
const fallbackStreamers: Streamer[] = [
  {
    id: 'acekydtv',
    name: 'Acekydtv',
    handle: 'acekydtv',
    initials: 'AK',
    role: 'The Captain & Creative',
    bio: 'Tech, vibes, and late-night FIFA sessions.',
    color: { from: 'purple-400', to: 'blue-400' },
    links: { twitch: 'https://twitch.tv/acekydtv' },
    order: 1,
    active: true,
    isLive: true,
    currentGame: 'FIFA 24',
    lastStreamTitle: 'BTG Community Night | FIFA Pro Clubs',
  },
  {
    id: 'hey_olla',
    name: 'Hey_olla',
    handle: 'hey_olla',
    initials: 'HO',
    role: 'The Stylish Sharpshooter',
    bio: 'Fashion meets precision gaming.',
    color: { from: 'blue-400', to: 'cyan-400' },
    links: { twitch: 'https://twitch.tv/hey_olla' },
    order: 2,
    active: true,
    isLive: true,
    currentGame: 'Call of Duty',
    lastStreamTitle: 'Sunday Snipes & Style Talk',
  },
  {
    id: 'ab_wavy',
    name: 'Ab_wavy',
    handle: 'ab_wavy',
    initials: 'AW',
    role: 'The Vibe Master',
    bio: 'Smooth gameplay meets chill streams.',
    color: { from: 'green-400', to: 'emerald-400' },
    links: { twitch: 'https://twitch.tv/ab_wavy' },
    order: 3,
    active: true,
    isLive: false,
    currentGame: 'Apex Legends',
    lastStreamTitle: 'Chill Wednesday Vibes | Community Games',
  }
];

const streamers = computed<Streamer[]>(() => {
  const fetchedStreamers = streamersDoc.value?.streamers ?? [];
  const activeStreamers = fetchedStreamers.filter((s) => s.active).sort((a, b) => a.order - b.order);
  return activeStreamers.length > 0 ? activeStreamers : fallbackStreamers;
});

// Map streamers to leader cards with stats
const streamerLeaders = computed(() =>
  streamers.value.map((s, i) => ({
    id: s.id,
    name: s.name,
    initials: s.initials,
    role: s.role,
    color: getStreamerColor(s.color),
    stat: {
      label: i === 0 ? 'Followers' : i === 1 ? 'Hours Streamed' : 'Community Rating',
      value: i === 0 ? '3.2K' : i === 1 ? '145' : '4.7',
    },
    subStats: [
      { label: 'Streams', value: '24' },
      { label: 'Avg Views', value: '58' },
      { label: 'Subs', value: '12' },
    ]
  }))
);

const upcomingStreams = computed(() =>
  streamers.value.map((s, i) => ({
    id: s.id,
    streamer: s.name,
    streamerInitials: s.initials,
    streamerColor: getStreamerColor(s.color),
    game: s.currentGame || 'Various Games',
    title: s.lastStreamTitle || 'Community Gaming Session',
    date: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'SAT 01.02',
    time: ['8:00 PM', '7:00 PM', '9:00 PM'][i],
    isLive: s.isLive,
    link: s.links?.twitch || 'https://twitch.tv',
  }))
);

const latestNews = [
  {
    slug: 'bpcl-season-5',
    title: 'BPCL Season 5 Registration Now Open',
    excerpt: 'Sign up for the most competitive Pro Clubs league. All skill levels welcome.',
    category: 'Tournament',
    date: 'Jan 28, 2026',
    image: '/highlight1.png',
  },
  {
    slug: 'new-streamers',
    title: 'Three New Streamers Join BTG Stream Team',
    excerpt: 'Welcoming talented content creators to our growing community.',
    category: 'Community',
    date: 'Jan 25, 2026',
    image: '/highlight2.png',
  },
];

const standings = [
  { id: '1', name: 'BTG Elite', abbr: 'ELT', color: '#6D28D9', wins: 8, draws: 1, losses: 1, points: 25 },
  { id: '2', name: 'BTG Rise', abbr: 'RSE', color: '#0EA5E9', wins: 6, draws: 2, losses: 2, points: 20 },
  { id: '3', name: 'BTG Icons', abbr: 'ICN', color: '#22C55E', wins: 5, draws: 3, losses: 2, points: 18 },
  { id: '4', name: 'BTG Legends', abbr: 'LGD', color: '#F59E0B', wins: 4, draws: 2, losses: 4, points: 14 },
  { id: '5', name: 'BTG Rookies', abbr: 'RKS', color: '#EF4444', wins: 2, draws: 1, losses: 7, points: 7 },
];

// Color mapping
const colorMap: Record<string, string> = {
  'purple-400': '#A855F7',
  'blue-400': '#60A5FA',
  'cyan-400': '#22D3EE',
  'green-400': '#4ADE80',
  'emerald-400': '#34D399',
};

function getStreamerColor(color: { from: string; to: string }): string {
  return colorMap[color.from] || '#6D28D9';
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).toUpperCase();
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>