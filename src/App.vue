<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

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
const brand = "Santa's Secret"
const location = 'Rovaniemi, Finland'
</script>
<template>
  <div>
    <!-- Navbar block-->
    <Navbar />

    <Header :brand="brand"></Header>
    <!-- Router View-->
    <main>
      <div>
        <transition name="fade" v-if="!isAuthRoute">
          <RouterView />
        </transition>
        <RouterView v-else />
      </div>
    </main>
    <!-- Footer block-->
    <Footer :brand="brand" :location="location"></Footer>
  </div>
</template>
<style scoped></style>
