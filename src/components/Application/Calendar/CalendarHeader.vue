<script setup>
import { MONTHS } from '@/helpers/calendarUtils'

defineProps({
  month: Number,
  year: Number,
})

defineEmits(['prev-month', 'next-month'])
</script>

<template>
  <div class="month">
    <button @click="$emit('prev-month')">&lt;</button>
    <div class="date">{{ MONTHS[month] }} {{ year }}</div>
    <button @click="$emit('next-month')">&gt;</button>
  </div>
</template>
