<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Header Section -->
    <section class="relative py-20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-10">
        <div>
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
            BTG <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">TEAMS</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Meet the squads that carry the BTG banner across leagues, ladders, and live events. Each roster is built different, united under one mission: push competitive culture forward.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-purple-300">{{ totalTeams }}</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Active Teams</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-blue-300">{{ uniqueRegions }}</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Regions Repped</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-emerald-300">{{ totalPlayers }}</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Core Players</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <!-- Teams Grid -->
      <section>
        <div class="grid grid-cols-1 gap-12">
          <div
            v-for="team in teams"
            :key="team.id"
            class="group bg-gray-800/80 rounded-3xl overflow-hidden border border-gray-700/80 hover:border-purple-500 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-2xl"
          >
            <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-0">
              <div class="relative p-10 lg:p-12 flex flex-col gap-8">
                <div class="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-35" :style="{ background: getGradient(team) }"></div>
                <div class="relative z-10 flex flex-col gap-8">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div 
                      class="w-20 h-20 rounded-3xl overflow-hidden flex items-center justify-center text-3xl font-black text-white shadow-xl ring-2 ring-white/10"
                      :style="{ background: getGradient(team) }"
                    >
                      <img
                        v-if="team.logo"
                        :src="team.logo"
                        :alt="`${team.name} logo`"
                        class="w-full h-full object-cover">
                      <span v-else>{{ getTeamInitials(team.name) }}</span>
                    </div>
                    <div>
                      <h2 class="text-4xl font-black text-white mb-2">{{ team.name }}</h2>
                      <p class="text-lg text-purple-200/90 max-w-xl">{{ team.tagline || 'Built different. Playing for the culture.' }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div class="bg-white/5 rounded-2xl border border-white/10 p-4">
                      <div class="text-xs uppercase tracking-widest text-gray-400 mb-1">Region</div>
                      <div class="text-lg font-semibold text-white">{{ team.region || 'Global' }}</div>
                    </div>
                    <div class="bg-white/5 rounded-2xl border border-white/10 p-4">
                      <div class="text-xs uppercase tracking-widest text-gray-400 mb-1">Division</div>
                      <div class="text-lg font-semibold text-white">{{ team.division || 'Independent' }}</div>
                    </div>
                    <div class="bg-white/5 rounded-2xl border border-white/10 p-4">
                      <div class="text-xs uppercase tracking-widest text-gray-400 mb-1">Captain</div>
                      <div class="text-lg font-semibold text-white">{{ team.captain || 'Announced Soon' }}</div>
                    </div>
                    <div class="bg-white/5 rounded-2xl border border-white/10 p-4">
                      <div class="text-xs uppercase tracking-widest text-gray-400 mb-1">Founded</div>
                      <div class="text-lg font-semibold text-white">{{ team.founded || '—' }}</div>
                    </div>
                  </div>

                  <div v-if="team.playstyle" class="bg-white/5 rounded-2xl border border-white/10 p-5 text-left">
                    <div class="text-xs uppercase tracking-widest text-gray-400 mb-2">Identity</div>
                    <p class="text-gray-200 leading-relaxed">{{ team.playstyle }}</p>
                  </div>

                  <div v-if="getTeamLinks(team).length" class="flex flex-wrap gap-3">
                    <UButton
                      v-for="link in getTeamLinks(team)"
                      :key="`${team.id}-${link.key}`"
                      :to="link.url"
                      target="_blank"
                      :color="link.color"
                      :variant="link.variant"
                      size="sm"
                      class="uppercase tracking-wide"
                    >
                      <UIcon :name="link.icon" class="mr-2" />
                      {{ link.label }}
                    </UButton>
                  </div>
                </div>
              </div>

              <div class="relative border-t lg:border-t-0 lg:border-l border-gray-700/60 bg-gray-900/70">
                <div class="absolute inset-0" :style="{ background: `${getGradient(team)}20` }"></div>
                <div class="relative z-10 p-8 lg:p-10 flex flex-col gap-8">
                  <div v-if="team.achievements?.length" class="space-y-4">
                    <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                      <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-yellow-300" />
                      Recent Honors
                    </h3>
                    <ul class="space-y-3 text-gray-200">
                      <li
                        v-for="achievement in team.achievements"
                        :key="`${team.id}-${achievement}`"
                        class="flex items-start gap-3"
                      >
                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-purple-300 mt-0.5" />
                        <span>{{ achievement }}</span>
                      </li>
                    </ul>
                  </div>

                  <div v-if="team.members?.length" class="space-y-4">
                    <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                      <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-blue-300" />
                      Core Roster
                    </h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <li
                        v-for="member in team.members"
                        :key="`${team.id}-${member.gamerTag}`"
                        class="bg-white/5 border border-white/10 rounded-xl p-4"
                      >
                        <div class="text-white font-semibold">{{ member.gamerTag }}</div>
                        <div class="text-xs uppercase tracking-widest text-purple-200/90 mt-1">
                          {{ member.role }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Culture CTA -->
      <section>
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-15"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Build With The Squad
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              We recruit grinders, visionaries, and glue players. Join the BTG Discord to hit trials, scout talent, and stay tapped into roster moves.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <UButton size="xl" color="primary" variant="solid"
                class="px-8 py-4 text-lg font-bold text-purple-900 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="https://discord.gg/HF7WAkJ4" target="_blank">
                <UIcon name="i-simple-icons-discord" class="mr-2" />
                Join Discord
              </UButton>
              <UButton size="xl" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-800 transition-all duration-300"
                to="/streams">
                <UIcon name="i-heroicons-play-circle" class="mr-2" />
                Meet Our Stream Team
              </UButton>
            </div>

            <div class="flex justify-center space-x-6">
              <a href="https://x.com/BTGOnline" target="_blank" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
              </a>
              <a href="https://discord.gg/HF7WAkJ4" target="_blank" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-discord" class="w-6 h-6" />
              </a>
              <a href="/shop" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Team, TeamsDoc, TeamLinks } from '@/types/team'
import teamsData from '@/content/teams.json'

const teams = computed<Team[]>(() => {
  const payload = (teamsData as TeamsDoc).teams ?? []
  return [...payload].sort((a, b) => a.name.localeCompare(b.name))
})

const totalTeams = computed(() => teams.value.length)
const uniqueRegions = computed(() => {
  const regions = new Set<string>()
  teams.value.forEach((team) => {
    if (team.region) regions.add(team.region)
  })
  return regions.size || 1
})
const totalPlayers = computed(() =>
  teams.value.reduce((count, team) => count + (team.members?.length ?? 0), 0)
)

const DEFAULT_COLORS = ['#6D28D9', '#1E40AF']

const getGradient = (team: Team): string => {
  const colors = (team.primaryColors?.length ? team.primaryColors : DEFAULT_COLORS).slice()
  if (colors.length === 1) colors.push(colors[0])
  return `linear-gradient(135deg, ${colors[0]}, ${colors[colors.length - 1]})`
}

const getTeamInitials = (name?: string): string => {
  if (!name) return 'BTG'
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3) || 'BTG'
}

type TeamLinkKey = keyof TeamLinks

interface TeamLinkOption {
  key: TeamLinkKey
  label: string
  icon: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'ghost'
}

interface TeamLinkResolved extends TeamLinkOption {
  url: string
}

const teamLinkConfig: TeamLinkOption[] = [
  { key: 'discord', label: 'Discord', icon: 'i-simple-icons-discord', color: 'primary', variant: 'solid' },
  { key: 'twitter', label: 'Twitter', icon: 'i-simple-icons-twitter', color: 'neutral', variant: 'outline' },
  { key: 'twitch', label: 'Twitch', icon: 'i-simple-icons-twitch', color: 'primary', variant: 'outline' },
  { key: 'youtube', label: 'YouTube', icon: 'i-simple-icons-youtube', color: 'error', variant: 'outline' },
  { key: 'instagram', label: 'Instagram', icon: 'i-simple-icons-instagram', color: 'neutral', variant: 'outline' },
  { key: 'website', label: 'Website', icon: 'i-heroicons-globe-alt', color: 'neutral', variant: 'ghost' },
]

const getTeamLinks = (team: Team): TeamLinkResolved[] =>
  teamLinkConfig
    .filter((entry) => Boolean(team.links?.[entry.key]))
    .map((entry) => ({
      ...entry,
      url: team.links?.[entry.key] as string,
    }))

useHead({
  title: 'BTG Teams - Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Meet the BTG competitive rosters redefining community esports. Explore squads, rosters, achievements, and learn how to join the movement.' },
    { name: 'keywords', content: 'BTG teams, esports roster, pro clubs, competitive gaming, Bravo Trashe Gaming, team recruitment' }
  ]
})
</script>