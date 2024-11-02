<script setup>
defineProps({
    brand: String
})
</script>

<template>
<div class="header">
    <h1>{{ brand }}</h1>
    <h4>The Ultimate Christmas Checklist!</h4>
</div>
</template>

<style scoped>

.header {
    background-image: url("https://t4.ftcdn.net/jpg/03/93/75/89/240_F_393758978_8dLMYC2AFG1Dq1RXi0fUEoWZl7XHJNXI.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    padding: -100px;
    
}

h1 {
    color: white;
    font-size: 60px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin-bottom: 0.1em;
    padding-top: 160px;

}

h4 {
    color: white;
    text-align: center;
    margin-top: 0.3em;
    font-size: 2.5rem;
    padding: 40px;
}

</style>