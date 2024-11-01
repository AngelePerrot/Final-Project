<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
// Ionela added - can be deleted after
import ShoppingList from './components/ShoppingList.vue'

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

const brand = 'Secret Santa'
const location = 'Rovaniemi, Finland'
</script>

<template>
  <div>
    <!-- Navbar block-->
    <Navbar />

    <!-- Router View-->
    <main>
      <div>
        <transition name="fade" v-if="!isAuthRoute">
          <RouterView />
        </transition>
        <RouterView v-else />
      </div>
    </main>

    <!-- Shopping list that can be erased -->
     <ShoppingList></ShoppingList>
    <!-- Footer block-->
    <Footer :brand :location></Footer>
  </div>
</template>

<style scoped></style>
