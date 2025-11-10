<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
      <!-- Gaming Grid Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
          Contact <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">BTG</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Got questions? Want to join the team? Looking for partnerships? Let's connect and build something amazing together.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16">
      <!-- Contact Form Section -->
      <section class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 class="text-3xl font-bold text-white mb-6">
              Send us a <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Message</span>
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">What's this about?</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership/Sponsorship</option>
                  <option value="tournament">Tournament Questions</option>
                  <option value="streaming">Join Our Stream Team</option>
                  <option value="merch">Merchandise</option>
                  <option value="press">Press/Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us more about what you're looking for..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin mr-2" />
                  Sending...
                </span>
                <span v-else class="flex items-center justify-center">
                  <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-2" />
                  Send Message
                </span>
              </button>
            </form>

            <!-- Success/Error Messages -->
            <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
              <div class="flex items-center">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-400 mr-2" />
                <span class="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</span>
              </div>
            </div>

            <div v-if="showErrorMessage" class="mt-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
              <div class="flex items-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-400 mr-2" />
                <span class="text-red-400 font-medium">{{ errorMessage }}</span>
              </div>
            </div>
          </div>

          <!-- Contact Info & Social -->
          <div class="space-y-8">
            <!-- Quick Connect -->
            <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8">
              <h3 class="text-2xl font-bold text-white mb-6">Connect With Us</h3>
              <div class="space-y-4">
                <a href="https://discord.gg/HF7WAkJ4" target="_blank" class="flex items-center gap-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UIcon name="i-simple-icons-discord" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-white font-semibold">Join Our Discord</p>
                    <p class="text-blue-100 text-sm">Community hub & tournaments</p>
                  </div>
                </a>

                <a href="https://x.com/BTGOnline" target="_blank" class="flex items-center gap-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UIcon name="i-simple-icons-twitch" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-white font-semibold">Follow on Twitch</p>
                    <p class="text-blue-100 text-sm">Watch our streams</p>
                  </div>
                </a>

                <a href="#" target="_blank" class="flex items-center gap-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UIcon name="i-simple-icons-twitter" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-white font-semibold">Twitter Updates</p>
                    <p class="text-blue-100 text-sm">Latest news & announcements</p>
                  </div>
                </a>

                <a href="#" target="_blank" class="flex items-center gap-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UIcon name="i-simple-icons-instagram" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-white font-semibold">Instagram</p>
                    <p class="text-blue-100 text-sm">Behind the scenes</p>
                  </div>
                </a>
              </div>
            </div>

            <!-- Response Time -->
            <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mt-1">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 class="text-white font-semibold mb-2">Response Time</h4>
                  <p class="text-gray-400 text-sm leading-relaxed">
                    We typically respond to messages within 24-48 hours. For urgent matters, reach out on Discord for faster support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Partnership Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Partnership <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Opportunities</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Looking to partner with BTG? We're always open to collaborations that align with our community values.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Sponsorship -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Tournament Sponsorship</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Partner with us to sponsor tournaments and events. Great exposure to engaged gaming communities.
            </p>
            <div class="text-sm text-purple-400 font-medium">
              ✨ BPCL & Community Events
            </div>
          </div>

          <!-- Content Creation -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-video-camera" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Content Collaboration</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Work with our stream team for authentic gaming content and brand partnerships.
            </p>
            <div class="text-sm text-blue-400 font-medium">
              ✨ Authentic Creator Network
            </div>
          </div>

          <!-- Business Partnership -->
          <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-handshake" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Business Development</h3>
            <p class="text-gray-400 leading-relaxed mb-4">
              Strategic partnerships to grow the community esports ecosystem together.
            </p>
            <div class="text-sm text-green-400 font-medium">
              ✨ Long-term Growth Focus
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Frequently Asked <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        <div class="max-w-4xl mx-auto space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-300"
            >
              <span class="text-white font-semibold">{{ faq.question }}</span>
              <UIcon :name="openFaq === index ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                     class="w-5 h-5 text-gray-400 transition-transform duration-300" />
            </button>
            <div v-if="openFaq === index" class="px-6 pb-4">
              <p class="text-gray-400 leading-relaxed" v-html="faq.answer"></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section>
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 relative overflow-hidden text-center">
          <!-- Background Pattern -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Connect?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're looking to join our community, explore partnerships, or just say hello, we'd love to hear from you.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <UButton size="xl" color="neutral" variant="solid"
                class="px-8 py-4 text-lg font-semibold bg-white text-purple-600 hover:scale-105 transition-all duration-300"
                to="/about">
                <UIcon name="i-heroicons-information-circle" class="mr-2" />
                Learn About BTG
              </UButton>
              <UButton size="xl" color="neutral" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
                to="/teams">
                <UIcon name="i-heroicons-users" class="mr-2" />
                Meet Our Team
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Contact page meta tags
useHead({
  title: 'Contact BTG - Get in Touch with Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Contact Bravo Trashe Gaming (BTG) for inquiries, partnerships, tournament questions, or to join our stream team. Connect with our community esports organization.' },
    { name: 'keywords', content: 'contact BTG, Bravo Trashe Gaming contact, esports partnership, gaming community contact, tournament inquiries, stream team application' }
  ]
})

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

// Form state
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('')

// FAQ state
const openFaq = ref<number | null>(null)

// FAQ data
const faqs = ref([
  {
    question: "How can I join the BTG community?",
    answer: "The best way to join is through our Discord server! You'll find links to all our tournaments, events, and community discussions there. Follow us on social media to stay updated on all BTG activities."
  },
  {
    question: "Can I apply to be part of the Stream Team?",
    answer: "Absolutely! We're always looking for authentic creators who align with our community values. Use the contact form above and select 'Join Our Stream Team' as your topic. Include links to your content and tell us why you'd be a great fit for BTG."
  },
  {
    question: "How do I participate in BPCL tournaments?",
    answer: "Tournament registration and details are announced on our Discord and social media channels. Keep an eye on our announcements for upcoming BPCL seasons and other community tournaments."
  },
  {
    question: "Do you offer sponsorship opportunities?",
    answer: "Yes! We partner with brands that align with our community-first values. Select 'Partnership/Sponsorship' in the contact form to discuss opportunities. We're interested in authentic partnerships that benefit our gaming community."
  },
  {
    question: "When will BTG merchandise be available?",
    answer: "BTG merch drops are coming soon! Follow our social media and join our Discord for first access to new releases. We're working on premium quality gear that represents the BTG community aesthetic."
  },
  {
    question: "Can I host an event with BTG?",
    answer: "We love collaborating on community events! Reach out through the contact form with details about your event idea. We're especially interested in events that bring gamers together and create positive community experiences."
  }
])

// Methods
const submitForm = async () => {
  isSubmitting.value = true
  showSuccessMessage.value = false
  showErrorMessage.value = false
  
  try {
    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form on success
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    }
    
    showSuccessMessage.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
    
  } catch (error) {
    showErrorMessage.value = true
    errorMessage.value = 'Failed to send message. Please try again or contact us through social media.'
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      showErrorMessage.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
