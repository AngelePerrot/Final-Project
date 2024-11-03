<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const userStore = useUserStore()
const router = useRouter()
const isLoggedIn = computed(() => userStore.isLoggedIn)

const signOut = async () => {
  try {
    await userStore.signOut()
    router.push({ path: '/' })
  } catch (error) {
    console.error('Sign out error:', error)
    alert('Failed to sign out. Please try again.')
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <nav class="navbar">
    <div class="logo-image" @click="scrollToTop" title="Back to top">
      <img src="@/assets/img/Logo.png" alt="Logo" />
      <div class="logo-shine"></div>
    </div>

    <div class="menu">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink v-if="isLoggedIn" to="/UserView"> Application </RouterLink>
      <RouterLink v-else to="/about"> About </RouterLink>
      <RouterLink to="/contact"> Contacts </RouterLink>
    </div>

    <!--########################-->
    <!-- Authentication Section -->
    <!--######################-->
    <div
      class="btn-group d-flex gap-4"
      role="group"
      aria-label="Authentication buttons"
    >
      <!-- IF authenticated - SIGN OUT-->
      <div
        v-if="isLoggedIn"
        class="nav-item d-flex align-items-center justify-content-center"
      >
        <button @click="signOut" class="nav-link btn btn-link text-center">
          SIGN OUT
        </button>
      </div>

      <!-- Sign In-->
      <div v-else class="d-flex">
        <router-link to="/auth/signIn" class="nav-link-left btn text-center">
          Sign In
        </router-link>
        <!-- Sign Up-->
        <router-link to="/auth/signUp" class="nav-link-right btn text-center">
          Sign Up
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  position: relative;
  background-color: #e5d5bb;
  width: 100%;
  height: 100px;
  font-family: 'Chicle', serif;
}

.logo-image {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 75px;
  height: 75px;
  margin: 8px 0 10px 10px;
}

.logo-image:hover {
  transform: scale(1.1);
}

.logo-image img {
  width: 100%;
  height: 100%;
  border-radius: 20%;
  background-color: white;
  transition: filter 0.3s ease;
  display: block;
}

.logo-image:hover img {
  filter: brightness(1.2);
}

.logo-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  animation: shine 3s infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.menu {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  color: white;
}

.menu a {
  margin: 0 0 0 70px;
  text-decoration: none;
  color: white;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
}

.nav-link-left,
.nav-link-right {
  font-size: 1.5rem;
  color: #213c18;
}

.nav-link-left:hover {
  color: #7b0a0a;
}

.nav-link-right:hover {
  color: #7b0a0a;
}

.nav-item .text-center .p-3 {
  font-size: 1.5rem;
  color: #213c18;
}

.nav-item .text-center span {
  font-size: 1.5rem;
  color: #213c18;
  font-weight: bold;
}
</style>
