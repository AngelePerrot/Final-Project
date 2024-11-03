<script setup>
defineProps({
    brand: String
});

import { ref, onMounted, onUnmounted } from 'vue';

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
});
</script>

<template>
<<<<<<< HEAD


<div class="home">
    <div class="countdown">
      <h2>Christmas is coming</h2>
      <p></p>
      <img src="c:\Users\anjerko\Downloads\360_F_463425858_s6qSgsZJx7JUYgbTtx252l73tjSK2ia1.jpg">

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
    <h1>{{ brand }}</h1>
    <h4>It's the most wonderful time of the year 🎁</h4>
</div>
=======
  <div class="container">
    <h3>This is the Home</h3>
  </div>
>>>>>>> 7790d49b69ae8a37e4cc112c7a6b3c11fc782f0c
</template>

<style scoped>

.home {
  background-color: #213c18;
  padding:5px;
}

.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  padding:20px;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  background-color: transparent;
  color: white;
}

.time-unit {
  text-align: center;
  color: white;
  background-color: rgba(235, 240, 239, 0.1);
  padding: 10px;
  border-radius: 8px;
  width: 70px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s;
}

.time-unit:hover {
  transform: scale(1.1);
}

.number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
}

h4 {
  text-align: center;
  color: white;
  padding:20px;
  font-size: 2rem;
}
img{
  width: 400px;
  padding:20px;
  border-radius: 50%;
}

h2 {
  font-size: 3rem;
}
</style>


