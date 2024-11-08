<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const email = ref('')
const password = ref('')

const redirect = useRouter()

const userStore = useUserStore()

const signIn = async () => {
  try {
    await userStore.signIn(email.value, password.value)
    await userStore.fetchUser()
    redirect.push({ path: '/UserView' })
  } catch (error) {
    console.error('Sign in error:', error)
    if (error.message.includes('Invalid login credentials')) {
      alert('Invalid email or password')
    } else if (error.message.includes('Email not confirmed')) {
      alert('Please confirm your email address')
    } else {
      alert(`Sign in error: ${error.message}`)
    }
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="form-card">
      <h2 class="form-title">Sign In</h2>
      <form @submit.prevent="signIn">
        <label for="email" class="col-12 mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="form-input"
        />
        <label for="Password" class="col-12 mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="form-input"
        />
        <button type="submit" class="submit-btn">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
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

.signup-container::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  opacity: 0.3;
  z-index: 0;
}
</style>
