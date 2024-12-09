<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const redirect = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showSuccess = ref(false)

const signup = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    
    await useUserStore().signUp(email.value, password.value)
    showSuccess.value = true
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="signup-container">
    <div class="form-card">
      <h2 class="form-title">Sign Up</h2>
      <form @submit.prevent="signup" class="form-sign-in">
        <div class="row mb-3">
          <label for="email" class="col-12 mb-2">Email</label>
          <div class="col-12">
            <div class="input-group">
              <input
                type="email"
                class="input-field form-control rounded-end"
                id="email"
                placeholder="example@gmail.com"
                v-model="email"
                required
              />
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="password" class="col-12 mb-2">Password</label>
          <div class="col-12">
            <div class="input-group">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                class="input-field form-control rounded-end"
                id="password"
                placeholder="**********"
                v-model="password"
                required
              />
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="confirmPassword" class="col-12 mb-2"
            >Confirm Password</label
          >
          <div class="col-12">
            <div class="input-group">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                class="input-field form-control rounded-end"
                id="confirmPassword"
                placeholder="**********"
                v-model="confirmPassword"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="submit-btn">Submit</button>
          </div>
        </div>
      </form>
      <div v-if="showSuccess" class="alert-success">
        <div class="success-icon">🎄</div>
        Successfully added to the Santa List!
        <div class="snow"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
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
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Great Vibes', cursive;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.alert-success {
  margin-top: 2rem;
  padding: 2rem;
  color: #2c5530;
  font-family: 'Great Vibes', cursive;
  font-size: 1.8rem;
  text-align: center;
  position: relative;
  animation: fadeIn 0.5s ease-in;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 245, 245, 0.95)
  );
  border-radius: 15px;
  border: 2px solid #c41e3a;
  box-shadow: 0 4px 15px rgba(196, 30, 58, 0.15);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
