<script setup>
import { ref } from 'vue'
defineProps({
  brand: String,
})

const currentSlide = ref(0)
const direction = ref('next')

const slides = [
  {
    icon: '🎄',
    title: 'Shopping List',
    description: 'Organize your shopping to be sure to never forget anything',
  },
  {
    icon: '🎁',
    title: 'Gift Lists',
    description: 'Keep track of your Christmas shopping',
  },
  {
    icon: '📅',
    title: 'Calendar',
    description: 'Never miss important holiday dates',
  },
  {
    icon: '✨',
    title: 'Bucket List',
    description:
      'A selection of holiday traditions and activities to try with family and friends',
  },
]

const nextSlide = () => {
  direction.value = 'next'
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  direction.value = 'prev'
  currentSlide.value =
    currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

import { onMounted, onUnmounted } from 'vue'

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

function calculateCountdown() {
  const now = new Date()
  const christmas = new Date(now.getFullYear(), 11, 25)
  if (now > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1)
  }
  const timeDifference = christmas - now
  countdown.value.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  countdown.value.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
  countdown.value.minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
  countdown.value.seconds = Math.floor((timeDifference / 1000) % 60)
}

let countdownInterval
onMounted(() => {
  calculateCountdown()
  countdownInterval = setInterval(calculateCountdown, 1000)
})
onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<template>
  <div class="home">
    <div class="countdown-container">
      <h2>Christmas is coming</h2>

      <div class="countdown-timer">
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

      <h4>It's the most wonderful time of the year 🎁</h4>
    </div>
  </div>

  <div class="home-container">
    <div class="content">
      <h1>Welcome to Your Ultimate Christmas Planner!</h1>
      <div class="intro-text">
        <p>
          Get ready to make this Christmas the most memorable one yet! Our
          website is here to help you organize, plan, and celebrate with ease.
          Whether you're gathering family, preparing the perfect holiday feast,
          or seeking inspiration for seasonal activities, we've got you covered.
        </p>
      </div>

      <h2 class="section-title">What's Inside:</h2>

      <div class="slider-container">
        <button class="slider-button prev" @click="prevSlide">❮</button>
        <div class="features-slider">
          <div
            class="feature-card"
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ active: index === currentSlide }"
          >
            <span class="feature-icon">{{ slide.icon }}</span>
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.description }}</p>
          </div>
        </div>
        <button class="slider-button next" @click="nextSlide">❯</button>
      </div>

      <div class="cta-section">
        <h3>
          Let us help you create a Christmas filled with joy, ease, and
          unforgettable memories. Dive in and start planning your best holiday
          season today!
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  background-color: var(--template-primary-clr);
  position: relative;
  overflow: hidden;
}

.countdown-container {
  width: 100%;
  height: 210px;
  background-color: var(--text-primary-clr);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

h2 {
  color: white;
  font-size: 2rem;
  font-family: 'Cinzel', serif;
  text-align: center;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.countdown-timer {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.time-unit {
  background: linear-gradient(145deg, var(--primary-clr), #880c0c);
  padding: 0.8rem;
  border-radius: 8px;
  min-width: 80px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.time-unit:hover {
  transform: translateY(-5px);
}

.number {
  display: block;
  color: white;
  font-size: 2.2rem;
  font-weight: bold;
  font-family: 'Cinzel', serif;
  line-height: 1;
}

.label {
  color: var(--text-secondary-clr);
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 5px;
}

h4 {
  color: white;
  font-size: 1.5rem;
  text-align: center;
  font-family: 'Great Vibes', cursive;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .countdown-container {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .countdown-timer {
    gap: 1rem;
  }

  .time-unit {
    min-width: 60px;
    padding: 0.5rem;
  }

  .number {
    font-size: 1.8rem;
  }

  .label {
    font-size: 0.8rem;
  }

  h4 {
    font-size: 1.2rem;
  }
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(2px 2px at 20% 20%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40% 40%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 60% 60%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 80% 80%, #fff, rgba(0, 0, 0, 0));
  background-size: 200px 200px;
  animation: snow 4s linear infinite;
  pointer-events: none;
}

@keyframes snow {
  0% {
    background-position:
      0px 0px,
      0px 0px,
      0px 0px,
      0px 0px;
  }
  100% {
    background-position:
      200px 200px,
      100px 200px,
      -100px 200px,
      -200px 200px;
  }
}

.home-container {
  min-height: 100vh;
  background: url('@/assets/img/Home.png') center/cover fixed;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform-style: preserve-3d;
  perspective: 1000px;
}

@media (max-width: 768px) {
  .home-container {
    background-attachment: scroll;
  }
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.7)
  );
  z-index: 1;
}

.home-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(2px 2px at 20% 20%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40% 40%, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 60% 60%, #fff, rgba(0, 0, 0, 0));
  background-size: 200px 200px;
  animation: snowfall 8s linear infinite;
  pointer-events: none;
  z-index: 2;
}

.content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  animation: fadeIn 1s ease-out;
}

h1 {
  color: var(--primary-clr);
  font-size: 4rem;
  margin-bottom: 5rem;
  font-family: 'Great Vibes', cursive;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  animation: slideDown 1s ease-out;
}

.intro-text {
  margin: 2rem auto;
  max-width: 800px;
  font-size: 1.4rem;
  line-height: 1.6;
  color: #213c18;
  font-family: 'Cinzel', serif;
  animation: fadeIn 1.5s ease-out;
}

.section-title {
  color: var(--primary-clr);
  font-size: 3rem;
  margin: 3rem 0;
  font-family: 'Great Vibes', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 20px;
  animation: fadeIn 2s ease-out;
}

.feature-card {
  background: linear-gradient(145deg, var(--primary-clr), #880c0c);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: -8px 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.feature-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  border-color: var(--text-secondary-clr);
  box-shadow: -12px 12px 32px rgba(0, 0, 0, 0.4);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
  animation: bounce 2s infinite;
}

.cta-section {
  margin: 2rem auto;
  max-width: 800px;
  font-size: 1.4rem;
  line-height: 1.6;
  color: #213c18;
  font-family: 'Cinzel', serif;
  animation: fadeIn 1.5s ease-out;
}

@keyframes snowfall {
  0% {
    background-position:
      0 0,
      0 0,
      0 0;
  }
  100% {
    background-position:
      200px 200px,
      100px 200px,
      -100px 200px;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .hero-image {
    width: 200px;
    height: 200px;
  }

  .intro-text {
    font-size: 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

.slider-container {
  position: relative;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 60px;
  height: 500px;
}

.features-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  position: relative;
}

.feature-card {
  position: absolute;
  width: 400px;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.6s ease;
  visibility: hidden;
  padding: 3rem;
}

.feature-card.active {
  opacity: 1;
  transform: translateX(0);
  visibility: visible;
}

.feature-card h3 {
  font-size: 2rem;
  margin: 1.5rem 0;
  color: white;
}

.feature-card p {
  font-size: 1.2rem;
  color: white;
  line-height: 1.6;
}

.feature-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
}

.slider-button {
  width: 50px;
  height: 50px;
  font-size: 2rem;
}

.slider-button.prev {
  left: -10px;
}

.slider-button.next {
  right: -10px;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(145deg, var(--primary-clr), #880c0c);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.slider-button:hover {
  background: linear-gradient(145deg, #880c0c, var(--primary-clr));
  transform: translateY(-50%) scale(1.1);
}

.slider-button.prev {
  left: 0;
}

.slider-button.next {
  right: 0;
}

@media (max-width: 1024px) {
  .slider-container {
    height: 400px;
    padding: 0 40px;
  }

  .feature-card {
    width: 300px;
    padding: 2rem;
  }

  .feature-card h3 {
    font-size: 1.8rem;
  }

  .feature-card p {
    font-size: 1.1rem;
  }

  .feature-icon {
    font-size: 4rem;
  }
}
</style>
```
