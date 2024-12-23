<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const userStore = useUserStore()
const router = useRouter()
const isLoggedIn = computed(() => userStore.isLoggedIn)
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSignOut = () => {
  toggleMobileMenu()
  signOut()
}
</script>

<template>
  <nav class="navbar">
    <button class="hamburger" @click="toggleMobileMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="logo-image" @click="scrollToTop" title="Back to top">
      <img src="@/assets/img/Logo.png" alt="Logo" />
    </div>
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <RouterLink @click="toggleMobileMenu" to="/"> Home </RouterLink>
      <RouterLink v-if="isLoggedIn" @click="toggleMobileMenu" to="/UserView">
        Christmas Planner
      </RouterLink>
      <RouterLink v-else @click="toggleMobileMenu" to="/about">
        About
      </RouterLink>
      <RouterLink @click="toggleMobileMenu" to="/contact">
        Contacts
      </RouterLink>

      <!-- Auth buttons for mobile -->
      <div v-if="isLoggedIn" class="mobile-auth-buttons">
        <router-link
          @click="toggleMobileMenu"
          to="/profile"
          class="nav-link-left btn"
        >
          Profile
        </router-link>
        <button @click="handleSignOut" class="nav-link-right btn">
          Sign Out
        </button>
      </div>
      <div v-else class="mobile-auth-buttons">
        <router-link
          @click="toggleMobileMenu"
          to="/auth/signIn"
          class="nav-link-left btn"
        >
          Sign In
        </router-link>
        <router-link
          @click="toggleMobileMenu"
          to="/auth/signUp"
          class="nav-link-right btn"
        >
          Sign Up
        </router-link>
      </div>
    </div>
    <div class="menu">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink v-if="isLoggedIn" to="/UserView">
        Christmas Planner
      </RouterLink>
      <RouterLink v-else to="/about"> About </RouterLink>
      <RouterLink to="/contact"> Contacts </RouterLink>
    </div>

    <div
      class="btn-group d-flex gap-4"
      role="group"
      aria-label="Authentication buttons"
    >
      <div
        v-if="isLoggedIn"
        class="nav-item d-flex align-items-center justify-content-center"
      >
        <router-link to="/profile" class="nav-link-left btn text-center">
          Profile
        </router-link>
        <button @click="signOut" class="nav-link-right btn text-center">
          Sign Out
        </button>
      </div>

      <div v-else class="d-flex">
        <router-link to="/auth/signIn" class="nav-link-left btn text-center">
          Sign In
        </router-link>
        <router-link to="/auth/signUp" class="nav-link-right btn text-center">
          Sign Up
        </router-link>
      </div>
    </div>
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <RouterLink @click="toggleMobileMenu" to="/"> Home </RouterLink>
      <RouterLink v-if="isLoggedIn" @click="toggleMobileMenu" to="/UserView">
        Christmas Planner
      </RouterLink>
      <RouterLink v-else @click="toggleMobileMenu" to="/about">
        About
      </RouterLink>
      <RouterLink @click="toggleMobileMenu" to="/contact">
        Contacts
      </RouterLink>

      <!-- Auth buttons for mobile -->
      <div v-if="isLoggedIn" class="mobile-auth-buttons">
        <router-link
          @click="toggleMobileMenu"
          to="/profile"
          class="nav-link-left btn"
        >
          Profile
        </router-link>
        <button @click="handleSignOut" class="nav-link-right btn">
          Sign Out
        </button>
      </div>
      <div v-else class="mobile-auth-buttons">
        <router-link
          @click="toggleMobileMenu"
          to="/auth/signIn"
          class="nav-link-left btn"
        >
          Sign In
        </router-link>
        <router-link
          @click="toggleMobileMenu"
          to="/auth/signUp"
          class="nav-link-right btn"
        >
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
  background-color: var(--template-primary-clr);
  width: 100%;
  height: 100px;
  font-family: 'Chicle', serif;
  z-index: 1000;
}

.logo-image {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 75px;
  height: 75px;
  margin: 8px 0 10px 10px;
  z-index: 1002;
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

.logo-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(2px 2px at 20% 20%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40% 40%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 60% 60%, #fff, rgba(0, 0, 0, 0));
  background-size: 100px 100px;
  animation: snow 4s linear infinite;
  pointer-events: none;
  border-radius: 20%;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1002;
  position: relative;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: none;
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--template-primary-clr);
  padding-top: 100px;
}

.mobile-menu.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.mobile-menu a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar .menu,
  .navbar .btn-group {
    display: none !important;
  }

  .mobile-menu .nav-link-left,
  .mobile-menu .nav-link-right {
    width: 100%;
    text-align: center;
    border-radius: 8px;
    margin: 0;
  }
}
@keyframes snow {
  0% {
    background-position:
      0px 0px,
      0px 0px,
      0px 0px;
  }
  100% {
    background-position:
      50px 50px,
      25px 50px,
      -25px 50px;
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
  gap: 10px;
}

.nav-item {
  gap: 10px;
}

.d-flex {
  gap: 10px;
}

.nav-link-left,
.nav-link-right {
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.nav-link-left {
  background-color: #880c0c;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-link-right {
  background-color: #880c0c;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.nav-link-left:hover,
.nav-link-right:hover {
  background-color: #7b0a0a;
}

.btn {
  border: none;
  font-size: 1rem;
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-image: url('/src/assets/img/Auth.jpg');
  background-position: 80% center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  margin: 0;
}

.form-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.form-title {
  color: #213c18;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  font-family: 'Great Vibes', cursive;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.2rem 0 1rem 0;
  border: 1px solid #213c18;
  border-radius: 8px;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .menu a {
    margin: 0 0 0 40px;
  }

  .nav-link-left,
  .nav-link-right {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .btn-group {
    margin-right: 10px;
  }
}
</style>
