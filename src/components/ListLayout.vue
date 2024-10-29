<script setup>

</script>

<template>
  
        <li class="list-cards">
            <slot name="image"></slot>
        </li>
        <div class="list-description">
            <slot name="name"></slot>
            <br>
            <slot name="actions"></slot>
    </div>
  
</template>

<style scoped>

.list-cards {
   
    margin: 20px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 350px;
    border: 1px solid #e18d8d;
    border-radius: 10%;
    padding: 15px;
    background-color: #666;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-cards .list-description{
    text-align: center;
    font-size: 1.1em;
    font-family: 'Courier New', Courier, monospace;
}

</style>