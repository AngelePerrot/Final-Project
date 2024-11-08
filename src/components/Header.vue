<script setup>
defineProps({
  brand: String,
})
</script>

<template>
  <div class="header">
    <h1>{{ brand }}</h1>
  </div>
</template>

<style scoped>
.header {
  background-image: url('@/assets/img/HeaderBackground.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 180px;
  position: relative;
}

h1 {
  color: white;
  font-size: 3.5em;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 50px 0;
  margin: 0;
  font-family: 'Cinzel', serif;
}

h4 {
  color: white;
  text-align: center;
  font-family: Cin;
}
</style>
