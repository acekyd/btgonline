<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
            <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BPCL</span>
            <span class="text-white"> Tournament</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join the most competitive Pro Clubs tournament. Battle it out with the best teams and prove your skills on the virtual pitch.
          </p>
        </div>

        <!-- Tournament Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 text-center">
            <UIcon name="i-heroicons-trophy" class="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-white mb-2">Championship</h3>
            <p class="text-gray-400">Compete for the ultimate Pro Clubs title</p>
          </div>
          <div class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 text-center">
            <UIcon name="i-heroicons-users" class="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-white mb-2">Team Format</h3>
            <p class="text-gray-400">11v11 Pro Clubs matches</p>
          </div>
          <div class="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-green-500/30 text-center">
            <UIcon name="i-heroicons-calendar" class="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-white mb-2">Live Updates</h3>
            <p class="text-gray-400">Real-time standings and fixtures</p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mb-12">
          <UButton size="xl" color="primary" variant="solid"
            class="px-8 py-4 text-white text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600"
            to="https://discord.gg/HF7WAkJ4" target="_blank">
            <UIcon name="i-simple-icons-discord" class="mr-2" />
            Join Our Discord
          </UButton>
        </div>
      </div>
    </section>

    <!-- Tournament Iframe Section -->
    <section class="py-8 bg-gray-800/30">
      <div class="max-w-7xl mx-auto px-4">
        <div class="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div class="mb-4 text-center">
            <h2 class="text-2xl font-bold text-white mb-2">Live Tournament Dashboard</h2>
            <p class="text-gray-400">Track standings, fixtures, and results in real-time</p>
          </div>
          
          <!-- Responsive Iframe Container -->
          <div class="relative w-full" style="padding-bottom: 75%; height: 0; overflow: hidden;">
            <iframe
              src="https://www.myproclubs.com/t/bpcl?embed=true"
              class="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
              title="BPCL Tournament Dashboard"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Info Section -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Compete?
        </h2>
        <p class="text-xl text-gray-400 mb-8 leading-relaxed">
          The BPCL tournament brings together the best Pro Clubs teams for intense competition. 
          Join our Discord community to stay updated on tournament news, find teammates, and connect with other players.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UButton size="lg" color="primary" variant="solid"
            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300"
            to="https://discord.gg/HF7WAkJ4" target="_blank">
            <UIcon name="i-simple-icons-discord" class="mr-2" />
            Join Discord Community
          </UButton>
          <UButton size="lg" color="neutral" variant="outline"
            class="px-8 py-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300"
            to="/teams">
            <UIcon name="i-heroicons-users" class="mr-2" />
            Meet Our Teams
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Tournament page meta tags
useHead({
  title: 'BPCL Tournament - Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Join the BPCL Pro Clubs tournament hosted by BTG. Compete in 11v11 matches, track live standings, and connect with the gaming community.' },
    { name: 'keywords', content: 'BPCL, Pro Clubs, tournament, FIFA, esports, BTG, gaming competition, football gaming' }
  ]
})
</script>

<style scoped>
/* Ensure iframe responsiveness */
.relative {
  position: relative;
}

/* Smooth transitions for interactive elements */
* {
  transition: all 0.3s ease;
}
</style>
