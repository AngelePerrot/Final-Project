<script setup>
import Calendar from '@/components/Application/Calendar.vue'
import { useUserStore } from '@/Store/userStore'
import BucketList from '@/components/Application/BucketList.vue'
import bucketList from '@/helpers/bucketList'
import ShoppingList from '@/components/Application/ShoppingList.vue'

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
  <Calendar />
  <ShoppingList />
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
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.user-name {
  font-weight: bold;
  color: white;
}

h1 {
  font-size: 2rem;
  margin: 0;
}
</style>
