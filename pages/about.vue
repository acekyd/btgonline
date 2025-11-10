<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
      <!-- Gaming Grid Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
          About <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BTG</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Discover the story behind Bravo Trashe Gaming and our mission to revolutionize community esports
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16">
      <!-- Mission Section -->
      <section class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
              Our <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed mb-6">
              To give non-professional gamers the same energy, structure, and recognition seen in pro-level esports — without losing the fun, chaos, and community that makes gaming great.
            </p>
            <p class="text-lg text-gray-400 mb-8">
              BTG is where casual meets competitive. We're building the most fun, welcoming, and banter-rich esports experience for everyday gamers. You don't need to be pro to feel the thrill of competitive gaming — just bring your controller, your squad, and your vibe.
            </p>
            <div class="flex flex-wrap gap-3">
              <div class="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-medium">
                Community First
              </div>
              <div class="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium">
                Inclusive Gaming
              </div>
              <div class="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium">
                Competitive Fun
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-center">
              <div class="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span class="text-3xl font-black text-purple-600">BTG</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Founded on Community</h3>
              <p class="text-purple-100">
                Built by gamers, for gamers who believe that esports should be accessible, authentic, and absolutely fun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- What We Do Section -->
      <section class="mb-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
            What We <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Do</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Building bridges between casual and competitive gaming through innovative community programs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Community Tournaments -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Community & Tournaments</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Host community-first tournaments and leagues like the BPCL (BTG Pro Clubs League) that bring together gamers across all skill levels for epic competition and unforgettable moments.
            </p>
            <div class="text-sm text-purple-400 font-medium">
              ✨ Featured: BPCL - BTG Pro Clubs League
            </div>
          </div>

          <!-- Streaming Team -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-video-camera" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Streaming Team</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Highlight streamers who bring personality and presence. Our featured creators showcase authentic gaming content that connects with our community and represents the BTG spirit.
            </p>
            <div class="text-sm text-blue-400 font-medium">
              ✨ Featured: Acekydtv, Hey_olla, Ab_wavy
            </div>
          </div>

          <!-- Content & Events -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-users" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Content & Events</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Design content and events that unite gamers across platforms. From community game nights to collaborative streams, we create experiences that foster genuine connections.
            </p>
            <div class="text-sm text-green-400 font-medium">
              ✨ Building connections beyond the game
            </div>
          </div>

          <!-- Merch & Culture -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-orange-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Merch & Culture</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Drop premium BTG merchandise that matches our aesthetic and represents the gaming culture we're building. Quality gear for the BTG family.
            </p>
            <div class="text-sm text-orange-400 font-medium">
              ✨ Premium drops coming soon
            </div>
          </div>
        </div>
      </section>

      <!-- Future Goals Section -->
      <section class="mb-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
            Future <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Goals</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Our roadmap for building the ultimate community esports experience
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <UIcon name="i-heroicons-sparkles" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Expanded Merch Line</h3>
            <p class="text-gray-400">
              Launch a full collection of BTG merchandise that represents our gaming culture and community pride.
            </p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <UIcon name="i-heroicons-academic-cap" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Creator Programs</h3>
            <p class="text-gray-400">
              Develop programs to support and grow upcoming content creators within the BTG community ecosystem.
            </p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <UIcon name="i-heroicons-globe-americas" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Global Expansion</h3>
            <p class="text-gray-400">
              Expand BTG's reach to connect gaming communities across different regions and create worldwide tournaments.
            </p>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="mb-20">
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div class="relative z-10 text-center">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-8">
              Our Values
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div class="text-white/60 text-6xl mb-4">🎮</div>
                <h3 class="text-2xl font-bold text-white mb-4">Inclusivity</h3>
                <p class="text-white/90">
                  Everyone belongs in gaming, regardless of skill level or background. We create space for all.
                </p>
              </div>
              
              <div>
                <div class="text-white/60 text-6xl mb-4">🔥</div>
                <h3 class="text-2xl font-bold text-white mb-4">Authenticity</h3>
                <p class="text-white/90">
                  Real people, real gaming, real connections. No fake personas, just genuine community spirit.
                </p>
              </div>
              
              <div>
                <div class="text-white/60 text-6xl mb-4">🏆</div>
                <h3 class="text-2xl font-bold text-white mb-4">Competitive Joy</h3>
                <p class="text-white/90">
                  Competition should be thrilling and fun. We bring the excitement without the toxicity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Join Us Section -->
      <section>
        <div class="text-center">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
            Join the <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p class="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Ready to be part of something bigger? Join the BTG family and help us redefine what community esports can be.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton size="xl" color="primary" variant="solid"
              class="px-8 py-4 text-white text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 shadow-2xl"
              to="/teams">
              <UIcon name="i-heroicons-users" class="mr-2" />
              Meet Our Team
            </UButton>
            <UButton size="xl" color="neutral" variant="outline"
              class="px-8 py-4 text-lg font-semibold border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300"
              to="https://discord.gg/HF7WAkJ4" target="_blank">
              <UIcon name="i-simple-icons-discord" class="mr-2" />
              Join Discord
            </UButton>
            <UButton size="xl" color="warning" variant="solid"
              class="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-105 transition-all duration-300"
              to="/shop">
              <UIcon name="i-heroicons-shopping-bag" class="mr-2" />
              Shop Merch
            </UButton>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// About page meta tags
useHead({
  title: 'About BTG - Community Esports Organization',
  meta: [
    { name: 'description', content: 'Learn about Bravo Trashe Gaming (BTG), our mission to make esports accessible and fun for everyday gamers, and our vision for community-first competitive gaming.' },
    { name: 'keywords', content: 'BTG about, community esports, gaming organization, inclusive gaming, competitive gaming, esports community' }
  ]
})
</script>
