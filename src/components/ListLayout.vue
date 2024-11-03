<script setup>

</script>

<template>
        <div class="list-description">
            <li class="list-cards">
            <slot name="name"></slot>
            <br>
            <slot name="actions"></slot>
            <br>
            <slot name="image"></slot>
        </li>
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
    flex-wrap: non-wrap;
    width: 200px;
    height: 300px;
    border: 1px solid #7b0a0a;
    border-radius: 10%;
    padding: 15px;
    background-image: url("https://images.unsplash.com/photo-1512389055488-8d82cb26ba6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hyaXN0bWFzfGVufDB8fDB8fHww");
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-cards .list-description{
    text-align: center;
    font-size: 1.1em;
}

</style>