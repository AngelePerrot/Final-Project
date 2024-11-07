<script setup></script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="Login-container">
      <div class="form-card">
        <h2 class="form-title">Forgot Password</h2>
        <form>
          <label for="email" class="col-12 mb-2">Email address:</label>
          <input
            type="email"
            class="form-input"
            id="email"
            v-model="email"
            required
          />
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  </form>
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
</style>
