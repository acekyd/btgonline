<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Enhanced Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700">
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]">
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div class="absolute top-3/4 right-1/4 w-24 h-24 bg-amber-500/20 rounded-full blur-lg animate-float-delayed">
        </div>
        <div class="absolute bottom-1/4 left-1/3 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl animate-float-slow">
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <!-- Animated Title -->
        <div class="mb-8">
          <h1 class="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
            <span class="inline-block animate-slide-in-up">BRAVO</span>
            <span
              class="inline-block animate-slide-in-up animation-delay-200 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">TRASHE</span>
          </h1>
          <div class="text-2xl md:text-4xl font-bold text-white/90 animate-slide-in-up animation-delay-400">
            GAMING TOURNAMENT
          </div>
        </div>

        <!-- Subtitle -->
        <p
          class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-up animation-delay-600">
          Where legends are born and dreams become reality. Join the most prestigious football tournament in the region.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up animation-delay-800">
          <UButton size="xl" color="warning" variant="solid"
            class="px-8 py-4 text-white text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/25"
            to="/register">
            <UIcon name="i-heroicons-trophy" class="mr-2" />
            Register Your Team
          </UButton>
          <UButton size="xl" color="neutral" variant="outline"
            class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            to="/tournaments">
            <UIcon name="i-heroicons-play" class="mr-2" />
            Watch Highlights
          </UButton>
        </div>

        <!-- Stats Row -->
        <div class="mt-16 grid grid-cols-3 gap-8 animate-slide-in-up animation-delay-1000">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-black text-amber-400">50+</div>
            <div class="text-white/80 font-medium">Teams</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-black text-amber-400">₦500K</div>
            <div class="text-white/80 font-medium">Prize Pool</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-black text-amber-400">10K+</div>
            <div class="text-white/80 font-medium">Spectators</div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <UIcon name="i-heroicons-chevron-down" class="w-8 h-8 text-white/60" />
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16">
      <!-- Enhanced About Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            About <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">BTG</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            More than just a tournament - we're building the future of competitive football
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                Bravo Trashe Gaming (BTG) is revolutionizing competitive football by creating a platform where talent
                meets opportunity. We're dedicated to fostering the next generation of football stars through fair
                competition, professional development, and community building.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center">
                <UIcon name="i-heroicons-users" class="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div class="text-2xl font-bold text-emerald-600">5+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div class="text-2xl font-bold text-blue-600">200+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Champions Crowned</div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl transform rotate-3">
            </div>
            <img src="/stadium.jpg" alt="BTG Stadium"
              class="relative rounded-2xl shadow-2xl w-full h-96 object-cover" />
          </div>
        </div>
      </section>

      <!-- Enhanced Tournament Features -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Tournament <span
              class="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Experience football like never before
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div
              class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-lightning-bolt" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Streaming</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Watch every match in crystal-clear HD with professional commentary and multiple camera angles.
            </p>
          </div>

          <div
            class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-chart-bar" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-time Stats</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Advanced analytics and live statistics to track player performance and team dynamics.
            </p>
          </div>

          <div
            class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div
              class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prize Pool</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Compete for substantial cash prizes and exclusive sponsorship opportunities.
            </p>
          </div>
        </div>
      </section>

      <!-- Tournament Highlights Grid -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Tournament <span
              class="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Highlights</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Relive the most incredible moments from our tournaments
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <img src="/highlight1.png" alt="Exciting Matches"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-bold mb-2">Epic Showdowns</h3>
              <p class="text-white/90 text-sm">Witness heart-stopping matches that define legends</p>
            </div>
          </div>

          <div
            class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <img src="/highlight2.png" alt="Top Teams"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-bold mb-2">Elite Competition</h3>
              <p class="text-white/90 text-sm">The region's finest teams battle for supremacy</p>
            </div>
          </div>

          <div
            class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <img src="/highlight3.png" alt="Competitive Play"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-bold mb-2">Championship Glory</h3>
              <p class="text-white/90 text-sm">Experience the thrill of competitive excellence</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            What Players <span
              class="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Say</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div class="flex text-amber-400 mb-4">
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6 italic">
              "BTG transformed my career. The level of organization and competition is unmatched in the region."
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">AJ</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Ahmed Johnson</div>
                <div class="text-sm text-gray-500">Team Captain, Lagos Lions</div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div class="flex text-amber-400 mb-4">
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6 italic">
              "The professionalism and quality of BTG events are world-class. Every match feels like a final."
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">MO</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Mary Okafor</div>
                <div class="text-sm text-gray-500">Striker, Abuja Eagles</div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div class="flex text-amber-400 mb-4">
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
              <UIcon name="i-heroicons-star-solid" class="w-5 h-5" />
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6 italic">
              "BTG gave us the platform to showcase our talent. The exposure we got was incredible!"
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">KA</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Kemi Adebayo</div>
                <div class="text-sm text-gray-500">Midfielder, Ibadan Warriors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="mb-20">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 p-12 md:p-16 text-center">
          <div
            class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]">
          </div>

          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Make History?
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join the most prestigious football tournament in the region. Register your team today and compete for
              glory!
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <UButton size="xl" color="neutral" variant="solid"
                class="px-8 py-4 text-lg font-bold text-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="/register">
                <UIcon name="i-heroicons-rocket-launch" class="mr-2" />
                Register Your Team
              </UButton>
              <UButton size="xl" color="neutral" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 text-black border-white hover:bg-white  transition-all duration-300"
                to="/schedule">
                <UIcon name="i-heroicons-calendar" class="mr-2" />
                View Schedule
              </UButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced Contact Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Get In <span
              class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions? Want to sponsor? Or just want to stay updated? We'd love to hear from you.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UButton size="lg" color="success" variant="solid"
            class="p-6 h-auto flex-col items-center justify-center hover:scale-105 transition-all duration-300"
            to="/contact">
            <UIcon name="i-heroicons-envelope" class="w-8 h-8 mb-2" />
            <span class="text-lg font-semibold">Contact Us</span>
            <span class="text-sm opacity-90">Send us a message</span>
          </UButton>

          <UButton size="lg" color="info" variant="solid"
            class="p-6 h-auto flex-col items-center justify-center hover:scale-105 transition-all duration-300"
            to="https://twitter.com/" target="_blank">
            <UIcon name="i-simple-icons-twitter" class="w-8 h-8 mb-2" />
            <span class="text-lg font-semibold">Follow Us</span>
            <span class="text-sm opacity-90">Stay updated</span>
          </UButton>

          <UButton size="lg" color="primary" variant="solid"
            class="p-6 h-auto flex-col items-center justify-center hover:scale-105 transition-all duration-300"
            to="/sponsor">
            <UIcon name="i-heroicons-building-office" class="w-8 h-8 mb-2" />
            <span class="text-lg font-semibold">Sponsor</span>
            <span class="text-sm opacity-90">Partner with us</span>
          </UButton>

          <UButton size="lg" color="warning" variant="solid"
            class="p-6 h-auto flex-col items-center justify-center hover:scale-105 transition-all duration-300"
            to="/newsletter">
            <UIcon name="i-heroicons-newspaper" class="w-8 h-8 mb-2" />
            <span class="text-lg font-semibold">Newsletter</span>
            <span class="text-sm opacity-90">Weekly updates</span>
          </UButton>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Enhanced meta tags
useHead({
  title: 'Bravo Trashe Gaming Tournament - Premier Football Competition',
  meta: [
    { name: 'description', content: 'Join BTG, the most prestigious football tournament in the region. Experience world-class competition, substantial prizes, and professional organization.' },
    { name: 'keywords', content: 'football tournament, sports competition, BTG, gaming, prizes, Nigeria' }
  ]
})

// Add custom CSS for animations
useHead({
  style: [{
    innerHTML: `
      @keyframes slide-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-180deg); }
      }
      
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(90deg); }
      }
      
      .animate-slide-in-up {
        animation: slide-in-up 0.8s ease-out forwards;
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-delayed {
        animation: float-delayed 8s ease-in-out infinite;
      }
      
      .animate-float-slow {
        animation: float-slow 10s ease-in-out infinite;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-800 {
        animation-delay: 0.8s;
      }
      
      .animation-delay-1000 {
        animation-delay: 1s;
      }
    `
  }]
})
</script>