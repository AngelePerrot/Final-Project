<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="menu">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/about"> About </RouterLink>
      <RouterLink to="/contact"> Contacts </RouterLink>
      <RouterLink to="/Auth"> Login / SignUp </RouterLink>
    </div>
  </nav>
</template>

<style scoped></style>
