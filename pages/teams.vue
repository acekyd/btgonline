<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
    <!-- Sports Pattern Background -->
    <div class="fixed inset-0 z-0 opacity-5">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIvPjxwb2x5Z29uIHBvaW50cz0iNTAsMjAgNjUsNDUgNTAsMzUgMzUsNDUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] bg-repeat"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Header -->
      <div class="text-center mb-12">
        <div class="inline-block relative mb-6">
          <h1 class="text-5xl md:text-7xl font-black text-green-800 mb-4">
            BTG TOURNAMENT
          </h1>
          <div class="h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"></div>
        </div>
        <p class="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Meet the competitive teams battling for championship glory
        </p>
        
        <!-- Tournament Stats -->
        <div class="flex justify-center gap-6 mb-10">
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div class="text-2xl font-bold text-green-700">{{ teams.length }}</div>
            <div class="text-gray-600 text-sm">Teams</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div class="text-2xl font-bold text-blue-700">₦500K</div>
            <div class="text-gray-600 text-sm">Prize Pool</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <div class="text-2xl font-bold text-orange-700">12</div>
            <div class="text-gray-600 text-sm">Weeks</div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="flex justify-center gap-3 mb-10">
          <UButton
            v-for="filter in filters"
            :key="filter.id"
            :variant="activeFilter === filter.id ? 'solid' : 'outline'"
            :color="activeFilter === filter.id ? 'success' : 'neutral'"
            @click="activeFilter = filter.id"
            class="px-4 py-2 text-sm font-medium"
          >
            {{ filter.label }}
          </UButton>
        </div>
      </div>

      <!-- Teams Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="(team, index) in filteredTeams"
          :key="team.id"
          class="team-card group cursor-pointer"
          @click="selectTeam(team)"
        >
          <!-- Team Card -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full hover:shadow-xl transition-shadow duration-300">
            <!-- Team Logo -->
            <div class="text-center mb-4">
              <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center border-2 border-green-200 group-hover:scale-105 transition-transform duration-300">
                <img
                  :src="team.logo"
                  :alt="team.name"
                  class="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>

            <!-- Team Info -->
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                {{ team.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ team.description }}</p>
              
              <!-- Team Stats -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-lg font-bold text-green-600">{{ team.wins || 0 }}</div>
                  <div class="text-xs text-gray-500">Wins</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-lg font-bold text-blue-600">{{ team.goals || 0 }}</div>
                  <div class="text-xs text-gray-500">Goals</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-lg font-bold text-orange-600">{{ team.rank || index + 1 }}</div>
                  <div class="text-xs text-gray-500">Rank</div>
                </div>
              </div>

              <!-- Performance Indicator -->
              <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Form</span>
                  <span>{{ team.performance || 85 }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000"
                    :style="{ width: `${team.performance || 85}%` }"
                  ></div>
                </div>
              </div>

              <!-- View Team Button -->
              <UButton
                :to="team.url"
                target="_blank"
                color="success"
                variant="soft"
                class="w-full"
                size="sm"
              >
                <UIcon name="i-heroicons-eye" class="mr-2" />
                View Team
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Team Spotlight -->
      <div v-if="selectedTeam" class="mb-12">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-blue-500 h-2"></div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <!-- Team Image -->
              <div class="relative">
                <div class="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 border-2 border-gray-200">
                  <img
                    :src="selectedTeam.logo"
                    :alt="selectedTeam.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Team Badge -->
                <div class="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{{ selectedTeam.rank }}
                </div>
              </div>

              <!-- Team Details -->
              <div>
                <div class="flex items-center mb-4">
                  <UIcon name="i-heroicons-trophy" class="w-6 h-6 text-yellow-500 mr-2" />
                  <span class="text-sm font-medium text-gray-600 uppercase tracking-wide">Team Spotlight</span>
                </div>
                
                <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ selectedTeam.name }}</h2>
                <p class="text-gray-700 text-lg mb-6 leading-relaxed">{{ selectedTeam.description }}</p>
                
                <!-- Detailed Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <div class="text-xl font-bold text-gray-800">{{ selectedTeam.wins || 0 }}</div>
                    <div class="text-gray-600 text-sm">Wins</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <UIcon name="i-heroicons-fire" class="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <div class="text-xl font-bold text-gray-800">{{ selectedTeam.goals || 0 }}</div>
                    <div class="text-gray-600 text-sm">Goals</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <UIcon name="i-heroicons-users" class="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <div class="text-xl font-bold text-gray-800">{{ selectedTeam.players || 11 }}</div>
                    <div class="text-gray-600 text-sm">Players</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <UIcon name="i-heroicons-star" class="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <div class="text-xl font-bold text-gray-800">{{ selectedTeam.rating || 4.8 }}</div>
                    <div class="text-gray-600 text-sm">Rating</div>
                  </div>
                </div>

                <UButton
                  :to="selectedTeam.url"
                  target="_blank"
                  size="lg"
                  color="success"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" class="mr-2" />
                  Visit Team Page
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tournament Info -->
      <div class="text-center">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div class="flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-yellow-500 mr-3" />
            <h2 class="text-3xl font-bold text-gray-800">Tournament Bracket</h2>
          </div>
          <p class="text-gray-700 text-lg mb-6">Follow the championship journey as teams compete for the ultimate prize!</p>
          <div class="flex justify-center gap-4">
            <UButton
              to="/bracket"
              size="lg"
              color="success"
              class="font-semibold"
            >
              <UIcon name="i-heroicons-trophy" class="mr-2" />
              View Bracket
            </UButton>
            <UButton
              to="/schedule"
              size="lg"
              color="info"
              variant="outline"
              class="font-semibold"
            >
              <UIcon name="i-heroicons-calendar" class="mr-2" />
              Match Schedule
            </UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Team data focused on sports performance
const teams = ref([
  {
    id: 1,
    name: 'Thunder Hawks',
    description: 'Dominant force with aggressive attacking style and rock-solid defense.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 12,
    goals: 34,
    rank: 1,
    performance: 95,
    players: 11,
    rating: 4.9,
    category: 'elite'
  },
  {
    id: 2,
    name: 'Storm Riders',
    description: 'Fast-paced gameplay with exceptional teamwork and strategic positioning.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 10,
    goals: 28,
    rank: 2,
    performance: 88,
    players: 11,
    rating: 4.7,
    category: 'elite'
  },
  {
    id: 3,
    name: 'Fire Lions',
    description: 'Fierce competitors known for their explosive offensive plays and leadership.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 9,
    goals: 25,
    rank: 3,
    performance: 82,
    players: 11,
    rating: 4.6,
    category: 'pro'
  },
  {
    id: 4,
    name: 'Steel Eagles',
    description: 'Disciplined squad with strong fundamentals and clutch performance.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 8,
    goals: 22,
    rank: 4,
    performance: 79,
    players: 11,
    rating: 4.5,
    category: 'pro'
  },
  {
    id: 5,
    name: 'Green Wolves',
    description: 'Hungry pack of rising stars with impressive coordination and spirit.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 7,
    goals: 19,
    rank: 5,
    performance: 75,
    players: 11,
    rating: 4.3,
    category: 'rising'
  },
  {
    id: 6,
    name: 'Blue Sharks',
    description: 'Relentless attackers who strike with precision and never give up.',
    logo: '/stadium.png',
    url: 'https://www.google.com',
    wins: 6,
    goals: 16,
    rank: 6,
    performance: 71,
    players: 11,
    rating: 4.2,
    category: 'rising'
  }
])

const selectedTeam = ref(teams.value[0])
const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'All Teams' },
  { id: 'elite', label: 'Elite Division' },
  { id: 'pro', label: 'Pro Division' },
  { id: 'rising', label: 'Rising Stars' }
]

const filteredTeams = computed(() => {
  if (activeFilter.value === 'all') return teams.value
  return teams.value.filter(team => team.category === activeFilter.value)
})

const selectTeam = (team: any) => {
  selectedTeam.value = team
}

// Meta tags
useHead({
  title: 'Teams - BTG Tournament',
  meta: [
    { name: 'description', content: 'Meet the competitive teams in the BTG Tournament. Championship squads, player stats, and tournament standings.' }
  ],
  style: [{
    innerHTML: `
      .team-card {
        transition: all 0.3s ease;
      }
      
      .team-card:hover {
        transform: translateY(-4px);
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* Subtle background pattern */
      .bg-pattern {
        background-image: radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.1) 1px, transparent 0);
        background-size: 20px 20px;
      }
    `
  }]
})
</script>