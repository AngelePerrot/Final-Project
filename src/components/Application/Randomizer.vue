<script setup>
import { ref } from "vue";

const bucketList = ref([
  {
    id: 1,
    name: 'Go shopping',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxnHJloTY_wLFoiUQ7ppEe-EAk4ZmrnsLLw&s',
  },
  {
    id: 2,
    name: 'Wrap Christmas gifts',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRnOOz48tcIw4vn30kiT3y1polpGI2o0pTOw&s',
  },
  {
    id: 3,
    name: 'Bake cookies',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kxJld7YebBcDuDPzruyArNx69CO4QZljdQ&s',
  },
  {
    id: 4,
    name: 'Decorate the Christmas Tree',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGZi7hlmL_P8kGEF67_s2yvTy0vEEpAhJuXg&s',
  },
  {
    id: 5,
    name: 'Make Dinner with Family',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8CN1uGdhJziQp2j_QtVKwFhlBdO9Om8Bi2A&s',
  },
  {
    id: 6,
    name: 'Have a Christmas Movie Night',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKOp6CLJ0uktbaUTiUkOAweLXxDISbzQf1kA&s',
  },
  {
    id: 7,
    name: 'Make a Snowman',
    img: 'data:image/jpeg;base64,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',
  },
  {
    id: 8,
    name: 'Visit the Christmas market',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiUiGIbbQc18p_uXOXYIzmKKSeIItr0moRjg&s',
  },
  {
    id: 9,
    name: 'Go Ice Skating',
    img: 'https://images.unsplash.com/photo-1609987052013-0f4e84e9ff5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwaWNlJTIwc2thdGluZ3xlbnwwfHwwfHx8Mg%3D%3D',
  },
  {
    id: 10,
    name: 'Play board games',
    img: 'https://images.unsplash.com/photo-1689073016656-d8c0b43d4394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvYXJkJTIwZ2FtZXN8ZW58MHx8MHx8fDI%3D',
  },
  {
    id: 11,
    name: 'Donate to a non-profit',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BNl6IaNAc37if5zi_JkweguQzvkACrEjxw&s',
  },
  {
    id: 12,
    name: 'Drink mulled wine',
    img: 'https://media.istockphoto.com/id/1282290948/photo/christmas-mulled-wine-gl%C3%BChwein-with-spices-and-christmas-tree.webp?a=1&b=1&s=612x612&w=0&k=20&c=FZ0c0yAJ2e9_eSN_NDT2eg6Knu6nOtiph_w7WZBSNA8=',
  },
  {
    id: 13,
    name: 'Do random acts of kindness',
    img: 'data:image/jpeg;base64,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',
  },
  {
    id: 14,
    name: 'Wear Matching Holiday Pajamas',
    img: 'https://media.istockphoto.com/id/1842842526/photo/two-sisters-girls-drink-cocoa-at-home-at-christmas-new-year-concept.jpg?s=612x612&w=0&k=20&c=FV__ujkA8ms9dwS3sTmM_u1WO7TuenK3_Dla5emDnVw=',
  },
  {
    id: 15,
    name: 'Write a letter to Santa',
    img: 'https://media.istockphoto.com/id/109723098/photo/pictures-of-real-santa-clauss-list-hes-checking-twice.jpg?s=612x612&w=0&k=20&c=AQwLkHOUnFPvEqNd6llTOWS2TQd8UU4ehqmkDjYhK1s=',
  },
]);

const selectedItem = ref(null);
const isSpinning = ref(false);
let rouletteInterval = null;


function startRoulette() {
  clearInterval(rouletteInterval); 
  isSpinning.value = true; 

  
  rouletteInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * bucketList.value.length);
    selectedItem.value = bucketList.value[randomIndex];
  }, 100);


  setTimeout(() => {
    clearInterval(rouletteInterval);
    isSpinning.value = false; 
  }, 3000);
};
</script>

<template>
    <div class="roulette-container">
      <h2>Santa's Activity Roulette! 🎅</h2>
      
      <!-- Display Selected Image -->
      <div v-if="selectedItem" class="selected-item">
        <img :src="selectedItem.img" :alt="selectedItem.name" class="activity-image" />
        <p>{{ selectedItem.name }}</p>
      </div>
  
      <!-- Roulette Button with Animation -->
      <button @click="startRoulette" :class="{ spinning: isSpinning }">Christmas Magic Spin</button>
    </div>
  </template>
  

<style scoped>
.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Merienda";
  padding: 30px;
  background: linear-gradient(145deg, #213c18, #162810);  /* deep forest green gradient */
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* Add snow effect overlay */
.roulette-container::before {
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
  z-index: 1;
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

/* Update other elements to be above the snow effect */
.selected-item, button, h2 {
  position: relative;
  z-index: 2;
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
    font-family: "Merienda";
    color: white;
    padding:
}
</style>