<script setup>
defineProps({
  bucketList: Array,
})

import ListLayout from './ListLayout.vue'
</script>

<template>
  <div class="list">
    <h1>Christmas Bliss List</h1>
    <ul>
      <ListLayout v-for="list in bucketList" :key="list.id">
        <template v-slot:image>
          <img :src="list.img" :alt="list.name" class="listImg" />
        </template>

        <template v-slot:name>
          {{ list.name }}
        </template>

        <template v-slot: actions>
          <button>Done</button>
        </template>
      </ListLayout>
    </ul>
  </div>
</template>

<style scope>
.list {
  background-color: #7b0a0a;
  text-transform: none;
  color: white;
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
  width: 140px;
  height: 150px;
  border-radius: 10%;
  border: 2px solid #7b0a0a;
}
</style>
