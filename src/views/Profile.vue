<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/Store/userStore'
import { supabase } from '@/lib/supabaseClient'

const userStore = useUserStore()
const loading = ref(false)
const error = ref(null)
const message = ref('')

const profileForm = ref({
  username: '',
  full_name: '',
  password: '',
})

onMounted(async () => {
  if (userStore.profile) {
    profileForm.value = {
      username: userStore.profile.username || '',
      full_name: userStore.profile.full_name || '',
      password: '',
    }
  }
})

async function updateUserProfile() {
  try {
    loading.value = true
    error.value = null
    message.value = ''

    if (!userStore.user) throw new Error('No user logged in')

    if (profileForm.value.password) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password: profileForm.value.password,
      })
      if (passwordError) throw passwordError
    }

    const updates = {
      id: userStore.user.id,
      username: profileForm.value.username,
      full_name: profileForm.value.full_name,
      updated_at: new Date().toISOString(),
    }

    await userStore.updateProfile(updates)
    message.value = 'Profile updated successfully!'
    profileForm.value.password = '' // Clear password field after successful update
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1>User Profile</h1>
      <form @submit.prevent="updateUserProfile" class="profile-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="profileForm.full_name"
            class="form-input"
            placeholder="Enter your full name"
          />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="profileForm.username"
            class="form-input"
            placeholder="Enter your username"
          />
        </div>

        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="profileForm.password"
            class="form-input"
            placeholder="Enter new password"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>

        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="message" class="success-message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-image: url('/src/assets/img/Auth.jpg');
  background-size: cover;
  background-position: center;
}

.profile-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h1 {
  color: #213c18;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Great Vibes', cursive;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #213c18;
  font-weight: bold;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #213c18;
  border-radius: 8px;
  font-size: 1rem;
}

.submit-btn {
  background-color: #880c0c;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #7b0a0a;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
}

.success-message {
  color: #28a745;
  text-align: center;
  margin-top: 1rem;
}
</style>
