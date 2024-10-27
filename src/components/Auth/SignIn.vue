<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const email = ref('')
const password = ref('')

const redirect = useRouter()

const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value)
    redirect.push({ path: '/' })
    console.log('Successfully signed in')
  } catch (error) {
    alert('Wrong password')
    console.log(error)
  }
}
</script>

<template>
  <div class="Login-container">
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
        <p class="forgot-password">
          <router-link to="/forgot">Forgot Password?</router-link>
        </p>
        <button type="submit" class="submit-btn">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.Login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: no-repeat center center fixed;
  background-image: url('/src/assets/img/Background-img-Auth.jpg');
  background-size: cover;
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
  font-family: 'Merry Christmas', sans-serif;
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

.submit-btn {
  background-color: #880c0c;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #7b0a0a;
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
