<script setup>
import { ref } from 'vue'
import bucketList from '@/assets/data/bucketList.json'

const selectedItem = ref(null)
const isSpinning = ref(false)
let rouletteInterval = null

function startRoulette() {
  clearInterval(rouletteInterval)
  isSpinning.value = true

  rouletteInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * bucketList.value.length)
    selectedItem.value = bucketList.value[randomIndex]
  }, 100)

  setTimeout(() => {
    clearInterval(rouletteInterval)
    isSpinning.value = false
  }, 3000)
}
</script>

<template>
  <div class="roulette-container">
    <h2>Santa's Activity Roulette! 🎅</h2>

    <!-- Display Selected Image -->
    <div v-if="selectedItem" class="selected-item">
      <img
        :src="selectedItem.img"
        :alt="selectedItem.name"
        class="activity-image"
      />
      <p>{{ selectedItem.name }}</p>
    </div>

    <!-- Roulette Button with Animation -->
    <button @click="startRoulette" :class="{ spinning: isSpinning }">
      Christmas Magic Spin
    </button>
  </div>
</template>

<style scoped>
.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Merienda';
  padding: 30px;
  background-color: #baa58c;
}

.selected-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.activity-image {
  width: 300px;
  height: 250px;
  object-fit: cover;
  border-radius: 50px;
  margin-bottom: 10px;
}

button {
  padding: 15px;
  font-size: 24px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #668c6f;
  color: #fff;
  border: none;
  width: 200px;
  height: 200px;
  position: relative;
  transition: transform 0.3s ease-in-out;
}

button.spinning {
  animation: spin 0.3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

p {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

h2 {
  font-family: 'Merienda';
  color: white;
  padding:;
}
</style>
