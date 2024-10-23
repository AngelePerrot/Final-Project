<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' })
    } else {
      // continue to dashboard
      router.push({ path: '/' })
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div>
    <!-- Navbar block-->
    <Navbar />

    <!-- Router block för andra vyer -->
    <router-view></router-view>

    <!-- Footer block-->
    <Footer />
  </div>
</template>

<style scoped></style>
