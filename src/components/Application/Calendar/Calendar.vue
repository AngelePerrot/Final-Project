<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '@/Store/taskStore'
import { useEventHandling } from '@/helpers/useEventHandling'
import EventForm from '@/components/Application/Calendar/EventForm.vue'
import CalendarHeader from '@/components/Application/Calendar/CalendarHeader.vue'
import {
  formatEventTime,
  useDaySelection,
  WEEKDAYS,
  MONTHS,
} from '@/helpers/calendarUtils'

defineOptions({
  name: 'TaskCalendar',
})

const taskStore = useTaskStore()
const { selectDay } = useDaySelection(taskStore)
const {
  newEventTitle,
  newEventTimeTo,
  newEventTimeFrom,
  editEventTimeFrom,
  editEventTimeTo,
  editEventTitle,
  isEditMode,
  isAddEventVisible,
  handleAddEvent,
  handleEditStart,
  handleUpdateEvent,
} = useEventHandling(taskStore)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    taskStore.generateCalendarDays()
  } catch (error) {
    console.error('Error loading tasks:', error)
  }
})
</script>

<template>
  <div class="calendar-container mb-4 mt-9">
    <div class="calendar">
      <CalendarHeader
        :month="taskStore.month"
        :year="taskStore.year"
        @prev-month="() => taskStore.setMonth(taskStore.month - 1)"
        @next-month="() => taskStore.setMonth(taskStore.month + 1)"
      />

      <div class="weekdays">
        <div v-for="day in WEEKDAYS" :key="day">{{ day }}</div>
      </div>

      <div class="days">
        <div
          v-for="(day, index) in taskStore.calendarDays"
          :key="index"
          :class="['day', day.class]"
          @click="event => selectDay(day.day, day.class, event)"
        >
          {{ day.day }}
        </div>
      </div>
    </div>

    <div class="events-section">
      <h3>
        Events for {{ taskStore.activeDay }} {{ MONTHS[taskStore.month] }}
        {{ taskStore.year }}
      </h3>

      <div class="events-list">
        <div
          v-if="taskStore.activeEvents.length === 0"
          class="no-events text-white"
        >
          No events scheduled
        </div>

        <template v-else>
          <div
            v-for="(event, index) in taskStore.activeEvents"
            :key="index"
            class="event-item"
          >
            <div class="event-content" @click="handleEditStart(event, index)">
              <h4>{{ event.title }}</h4>
              <p>{{ formatEventTime(event.time) }}</p>
            </div>
            <button
              @click="taskStore.removeEvent(event.task_id)"
              class="remove-event-btn"
              title="Remove Event"
            >
              ×
            </button>
          </div>
        </template>

        <EventForm
          v-if="isEditMode"
          mode="edit"
          v-model:title="editEventTitle"
          v-model:timeFrom="editEventTimeFrom"
          v-model:timeTo="editEventTimeTo"
          @submit="handleUpdateEvent"
          @cancel="isEditMode = false"
        />
      </div>

      <button
        @click="isAddEventVisible = !isAddEventVisible"
        class="add-event-btn"
      >
        Add Event
      </button>

      <div class="calendar-helper-text">
        <p>Don't forget to plan all your events before Christmas! ❄️</p>
      </div>

      <EventForm
        v-if="isAddEventVisible"
        mode="add"
        v-model:title="newEventTitle"
        v-model:timeFrom="newEventTimeFrom"
        v-model:timeTo="newEventTimeTo"
        @submit="handleAddEvent"
        @cancel="isAddEventVisible = false"
      />
    </div>
  </div>
</template>
