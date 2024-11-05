<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bucketList: Array,
})

const currentIndex = ref(0)
const itemsPerPage = 4
const completedItems = ref(new Set())

const displayedItems = computed(() => {
  return props.bucketList.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage,
  )
})

const showPrevButton = computed(() => currentIndex.value > 0)
const showNextButton = computed(
  () => currentIndex.value + itemsPerPage < props.bucketList.length,
)

function nextSlide() {
  if (currentIndex.value + itemsPerPage < props.bucketList.length) {
    currentIndex.value += itemsPerPage
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value -= itemsPerPage
  }
}

function toggleComplete(id) {
  if (completedItems.value.has(id)) {
    completedItems.value.delete(id)
  } else {
    completedItems.value.add(id)
  }
}
</script>

<template>
  <div class="container">
    <h1>Christmas Bucket List</h1>
    <div class="carousel-container">
      <button
        class="nav-button prev"
        @click="prevSlide"
        :class="{ hidden: !showPrevButton }"
      >
        &#8249;
      </button>

      <div class="grid-container">
        <div v-for="list in displayedItems" :key="list.id" class="list-card">
          <div
            class="card-content"
            :class="{ completed: completedItems.has(list.id) }"
          >
            <img :src="list.img" :alt="list.name" class="listImg" />
            <div class="card-overlay">
              <h3>{{ list.name }}</h3>
              <button class="action-btn" @click="toggleComplete(list.id)">
                {{ completedItems.has(list.id) ? 'Undo' : 'Done' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="nav-button next"
        @click="nextSlide"
        :class="{ hidden: !showNextButton }"
      >
        &#8250;
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #7b0a0a;
  padding: 40px 20px;
  color: white;
  margin: auto;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem;
  font-family: 'Great Vibes', cursive;
}
.container::before {
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
  animation: snowfall 4s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes snowfall {
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

h1 {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem;
  font-family: 'Great Vibes', cursive;
}

.carousel-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  font-family: 'Cinzel', serif;
  z-index: 2;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 20px 0;
}

.list-card {
  position: relative;
  transition: transform 0.3s ease;
  height: 300px;
}

.list-card:hover {
  transform: scale(1.05);
}

.card-content {
  position: relative;
  height: 100%;
  background-image: url('/src/assets/img/PaperBcg.jpg');
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.listImg {
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: opacity 0.3s ease;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(123, 10, 10, 0.9);
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.list-card:hover .card-overlay {
  transform: translateY(0);
}

.list-card:hover .listImg {
  opacity: 0.7;
}

.card-overlay h3 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.action-btn {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  color: #7b0a0a;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: 0.5s;
}

.action-btn:hover {
  background: linear-gradient(145deg, #7b0a0a, #880c0c);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 10, 10, 0.4);
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(123, 10, 10, 0.3);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: #7b0a0a;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: 0.5s;
}

.nav-button:hover {
  background: linear-gradient(145deg, #7b0a0a, #880c0c);
  color: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(123, 10, 10, 0.4);
}

.nav-button:hover::before {
  left: 100%;
}

.nav-button:active {
  transform: translateY(-50%) scale(0.95);
  box-shadow: 0 2px 10px rgba(123, 10, 10, 0.3);
}

.nav-button.prev {
  left: -10px;
}

.nav-button.next {
  right: -10px;
}

.nav-button.hidden {
  display: none;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .list-card {
    height: 250px;
  }
}

/* Add these at the end of your existing styles */
.card-content.completed .listImg {
  filter: grayscale(100%);
  opacity: 0.6;
}

.card-content.completed::after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background: #7b0a0a;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  z-index: 2;
}

.card-content.completed .card-overlay {
  background: rgba(123, 10, 10, 0.7);
}
</style>
