<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/Store/userStore'

const redirect = useRouter()
const email = ref('')
const password = ref('')

const signup = async () => {
  try {
    await useUserStore().signUp(email.value, password.value)
    console.log('Sucessfully signed up')
    redirect.push({ path: '/auth/signIn' })
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
          <div class="col-12 col-md-6">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: no-repeat center center fixed;
  background-image: url('/src/assets/img/Gift-box.png');
  background-size: cover;
}

.form-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
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
  font-family: 'Merry Christmas', sans-serif; /* Add a festive font */
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

/* Decorations for festive feel */
</style>
