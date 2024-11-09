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
      <div class="logo-container">
        <img src="@/assets/img/logo.png" alt="Santa's Secret Logo" class="footer-logo">
      </div>
      <!-- Added functionality like in the Navbar with RouterLink -->
      <nav class="footer-nav">
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/about"> About </RouterLink>
        <RouterLink to="/contact"> Contacts </RouterLink>
      </nav>
      <!-- Social Media Icons working after I added code in index.html -->
      <div class="social-icons">
        <a href="https://www.facebook.com/profile.php?id=61568645872379"><i class="bi bi-facebook"></i></a>
        <a href="https://www.instagram.com/santas_secret_24/"><i class="bi bi-instagram"></i></a>
        <a href="https://x.com/SChecklist60172"><i class="bi bi-twitter"></i></a>
        <a href="https://www.tiktok.com/@santas_secret_24"><i class="bi bi-tiktok"></i></a>
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
  background-color: #213C18; /* Dark background for footer */
  color: #E5D5BB; /* Light text color */
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
  color: #E5D5BB;
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

  width: 80px; /* Adjust Size */
  border-radius: 50%;
  background-color: #E5D5BB;
}
.footer-nav {
  display: flex;
  gap: 20px;
}
.footer-nav a {
  color: #E5D5BB;
  text-decoration: none;
  font-size: 16px;
}
.footer-nav a:hover {
  color: #BAA58C; /* Color for when you hover over the text */
}
.social-icons {
  display: flex;
  gap: 10px;
}
.social-icons a {
  color: #E5D5BB;
  font-size: 18px;
  text-decoration: none;
}
hr {
  border: none;
  border-top: 0.5px solid #E5D5BB; /* Style for horizontal line */
  opacity: 0.5; /* Makes line more subtle */
  margin: 20px 0;
}
.copyright {
  font-size: 14px;
  color: #E5D5BB;
}
/* Large Screens (Desktops) */
@media (max-width: 1200px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
  .logo {
    width: 70px;
  }
  .footer-nav a {
    font-size: 15px;
  }
}
/* Medium Screens (Tablets) */
@media (max-width: 992px) {
  .footer {
    padding: 15px;
  }
  .container {
    gap: 15px;
  }
  .time-unit {
    width: 70px;
  }
  .footer-nav a {
    font-size: 14px;
  }
  .social-icons a {
    font-size: 16px;
  }
}
/* Small Screens (Mobile Devices) */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }
  .logo {
    width: 60px;
  }
  .footer-nav {
    flex-direction: column;
    gap: 10px;
  }
  .container {
    gap: 10px;
  }
  .time-unit {
    width: 60px;
    padding: 10px;
  }
  .number {
    font-size: 2rem;
  }
  .label {
    font-size: 0.9rem;
  }
  .social-icons {
    gap: 8px;
  }
}
/* Extra Small Screens (Small mobile devices) */
@media (max-width: 576px) {
  .footer-content {
    gap: 10px;
  }
  .logo {
    width: 50px;
  }
  .container {
    gap: 5px;
  }
  .time-unit {
    width: 50px;
    padding: 8px;
  }
  .number {
    font-size: 1.8rem;
  }
  .label {
    font-size: 0.8rem;
  }
  .footer-nav a {
    font-size: 12px;
  }
  .social-icons a {
    font-size: 14px;
  }
}
.logo-container {
  display: flex;
  align-items: center;
}

.footer-logo {
  width: 75px;
  height: 75px;
  border-radius: 20%;
  background-color: white;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.1);
}
</style>
