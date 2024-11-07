<script setup>
import ListLayout from './ListLayout.vue'

defineProps({
  bucketList: Array,
})
</script>

<template>
  <div class="container">
    <h1>Christmas Bucket List</h1>
    <ul>
      <ListLayout v-for="list in bucketList" :key="list.id">
        <template v-slot:image>
          <img :src="list.img" :alt="list.name" class="listImg" />
        </template>

        <template v-slot:name>
          {{ list.name }}
        </template>

        <template v-slot:actions>
          <button>Done</button>
        </template>
        
      </ListLayout>
    </ul>
  </div>
</template>

<style scope>
.container {
  background-color: #7b0a0a;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
}

h1 {
  text-align: center;
}

ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.listImg {
  width: 160px;
  height: 160px;
  border-radius: 10%;
  border: 2px solid #7b0a0a;
}

.listImg:hover {
    border: 4px solid #7b0a0a;
    ;
}

.name{
  padding: 2rem;
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;
}

button {
  color: white;
}
</style>
