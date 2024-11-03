<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  brand: String,
  location: {
    type: String,
    default: 'Worldwide',
  },
})

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

function calculateCountdown() {
  const now = new Date()
  const christmas = new Date(now.getFullYear(), 11, 25) // Month is 0-indexed, so 11 is December

  if (now > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1) // Move to next year's Christmas if past Dec 25
  }

  const timeDifference = christmas - now

  countdown.value.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  countdown.value.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
  countdown.value.minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
  countdown.value.seconds = Math.floor((timeDifference / 1000) % 60)
}

let countdownInterval

onMounted(() => {
  calculateCountdown() // Initial calculation
  countdownInterval = setInterval(calculateCountdown, 1000) // Update every second
})

onUnmounted(() => {
  clearInterval(countdownInterval) // Clean up interval on component unmount
})
</script>

<template>
  <div class="footer">
    <!-- Countdown: Days until Christmas -->
    <div class="countdown">
      <h2>Until Christmas:</h2>

      <div class="container">
        <div class="time-unit">
          <span class="number">{{ countdown.days }}</span>
          <span class="label">Days</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ countdown.hours }}</span>
          <span class="label">Hours</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ countdown.minutes }}</span>
          <span class="label">Minutes</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ countdown.seconds }}</span>
          <span class="label">Seconds</span>
        </div>
      </div>
    </div>

    <hr />

    <!-- Footer Content: Logo, Navigation, Social Media Icons-->
    <div class="footer-content">
      <img src="@/assets/img/file.png" alt="Logo Icon" class="logo" />

      <!-- Added functionality like in the Navbar with RouterLink -->
      <nav class="footer-nav">
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/about"> About </RouterLink>
        <RouterLink to="/contact"> Contacts </RouterLink>
      </nav>

      <!-- Social Media Icons working after I added code in index.html -->
      <div class="social-icons">
        <a href="#"><i class="bi bi-facebook"></i></a>
        <a href="https://www.canva.com/design/DAGVV9aLc1Q/H-vPEAJux9EalGF2rVthdQ/view?utm_content=DAGVV9aLc1Q&utm_campaign=designshare&utm_medium=link&utm_source=editor"><i class="bi bi-instagram"></i></a>
        <a href="#"><i class="bi bi-twitter"></i></a>
        <a href="#"><i class="bi bi-tiktok"></i></a>
      </div>
    </div>

    <p class="copyright">
      &copy; 2024 {{ brand }} | {{ location }} <br />
      All rights reserved
    </p>
  </div>
</template>

<style scoped>
.footer {
  background-color: #213c18;
  /* Dark background for footer */
  color: #e5d5bb;
  /* Light text color */
  padding: 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
}

.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  background-color: transparent;
}

.time-unit {
  text-align: center;
  color: #e5d5bb;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  width: 80px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.time-unit:hover {
  transform: scale(1.1);
}

.number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
}

.label {
  font-size: 1rem;
  margin-top: 5px;
  opacity: 0.7;
}

.logo {
  width: 80px; /* Adjust Size */
  border-radius: 50%;
  background-color: #e5d5bb;
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.footer-nav a {
  color: #e5d5bb;
  text-decoration: none;
  font-size: 16px;
}

.footer-nav a:hover {
  color: #baa58c;
  /* Color for when you hover over the text */
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons a {
  color: #e5d5bb;
  font-size: 18px;
  text-decoration: none;
}

hr {
  border: none;
  border-top: 0.5px solid #e5d5bb;
  /* Style for horizontal line */
  opacity: 0.5;
  /* Makes line more subtle */
  margin: 20px 0;
}

.copyright {
  font-size: 14px;
  color: #e5d5bb;
}
</style>
