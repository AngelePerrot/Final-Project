<script setup>
import Calendar from '@/components/Application/Calendar/Calendar.vue'
import { useUserStore } from '@/Store/userStore'
import BucketList from '@/components/Application/BucketList.vue'
import bucketList from '@/helpers/bucketList'
import ShoppingList from '@/components/Application/ShoppingList.vue'
import Randomizer from '@/components/Application/Randomizer.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="welcome-banner">
    <div class="welcome-message">
      Welcome,
      <span class="user-name">{{
        userStore.profile?.full_name || userStore.user?.email
      }}</span>
    </div>
  </div>
  <BucketList :bucketList="bucketList" />
  <Randomizer />
  <div class="application-wrapper">
    <Calendar />
    <ShoppingList />
  </div>
</template>

<style scoped>
.user {
  padding: 20px;
}

.welcome-banner {
  background-color: var(--primary-clr);
  color: white;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-message {
  font-size: 2rem;
  font-weight: bold;
}

h1 {
  font-size: 2rem;
  margin: 0;
}
</style>
