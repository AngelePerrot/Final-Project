<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="logo-image">
      <img src="c:\Users\anjerko\Downloads\Santa.png" alt="Logo" />
    </div>

    <div class="menu">
      <RouterLink to="/"> Home </RouterLink>|
      <RouterLink to="/about"> About </RouterLink>|
      <RouterLink to="/contact"> Contacts </RouterLink>|
    </div>

    <div class="btn-group">
      <RouterLink to="/Auth">
        <button type="button" class="btn btn-outline-primary">Sign Up</button>
        <button type="button" class="btn btn-outline-primary">Log In</button>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  position: relative;
  background-color: #e5d5bb;
  width: 100%;
  height: 100px;
}

.logo-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  margin: 10px 0 0 10px;
}

.menu {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  color: white;
}

.menu a {
  margin: 0 20px;
  text-decoration: none;
  color: white;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  /*color: #65714f;*/
}
</style>
