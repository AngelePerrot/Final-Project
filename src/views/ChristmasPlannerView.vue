<script setup>
import { useUserStore } from '@/store/userStore'
import bucketList from '@/helpers/bucketList'
import Calendar from '@/components/ChristmasPlanner/Calendar.vue'
import BucketList from '@/components/ChristmasPlanner/BucketList.vue'
import ShoppingList from '@/components/ChristmasPlanner/ShoppingList.vue'

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
  font-size: 2rem;
  font-weight: bold;
}

h1 {
  font-size: 2rem;
  margin: 0;
}
</style>
