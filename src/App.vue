<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
  } catch (error) {
    console.log(error.message)
  }
})

const isAuthRoute = computed(() => {
  const currentPath = router.currentRoute.value.path
  return currentPath.startsWith('/auth')
})
</script>

<template>
  <div>
    <!-- Navbar block-->
    <Navbar />

    <!-- Router View-->
    <main>
      <div
        class="container d-flex justify-content-center"
        style="padding: 50px 0 100px 0"
      >
        <transition name="fade" v-if="!isAuthRoute">
          <RouterView />
        </transition>
        <RouterView v-else />
      </div>
    </main>

    <!-- Footer block-->
    <Footer />
  </div>
</template>

<style scoped></style>
