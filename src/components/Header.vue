<script setup>
defineProps({
    brand: String
});
</script>

<template>
<div class="header">
    <h1>{{ brand }}</h1>
</div>
</template>

<style scoped>

.header {
   
    background-image: url("src/assets/img/240_F_393758978_8dLMYC2AFG1Dq1RXi0fUEoWZl7XHJNXI.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    
}

h1 {
    color: white;
    font-size: 60px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 90px;
}

h4 {
    color: white;
    text-align: center;
    
}
</style>