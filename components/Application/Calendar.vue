<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/Store/taskStore'

defineOptions({
  name: 'TaskCalendar',
})

const taskStore = useTaskStore()

// Keep only UI-related state locally
const isAddEventVisible = ref(false)
const isEditMode = ref(false)
const editingEvent = ref(null)
const newEventTitle = ref('')
const newEventTimeFrom = ref('')
const newEventTimeTo = ref('')
const editEventTitle = ref('')
const editEventTimeFrom = ref('')
const editEventTimeTo = ref('')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function toggleAddEvent() {
  isAddEventVisible.value = !isAddEventVisible.value
}

function validateTimeFormat(time) {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  return regex.test(time)
}

async function addEvent() {
  try {
    if (
      !newEventTitle.value ||
      !newEventTimeFrom.value ||
      !newEventTimeTo.value
    ) {
      alert('Please fill all fields')
      return
    }

    if (newEventTitle.value.length <= 3) {
      alert('Event title must be longer than 3 characters')
      return
    }

    if (
      !validateTimeFormat(newEventTimeFrom.value) ||
      !validateTimeFormat(newEventTimeTo.value)
    ) {
      alert('Invalid time format. Please use HH:MM format (e.g., 09:00)')
      return
    }

    const eventData = {
      title: newEventTitle.value,
      timeFrom: newEventTimeFrom.value,
      timeTo: newEventTimeTo.value,
      day: taskStore.activeDay,
      month: taskStore.month + 1,
      year: taskStore.year,
    }

    await taskStore.addEvent(eventData)

    // Reset form
    newEventTitle.value = ''
    newEventTimeFrom.value = ''
    newEventTimeTo.value = ''
    isAddEventVisible.value = false
  } catch (error) {
    console.error('Error in addEvent:', error)
    alert(`Failed to add event: ${error.message}`)
  }
}

function startEditEvent(event, index) {
  isEditMode.value = true
  editingEvent.value = { ...event, index }
  editEventTitle.value = event.title
  const [timeFrom, timeTo] = event.time.split(' - ')
  editEventTimeFrom.value = timeFrom
  editEventTimeTo.value = timeTo
}

async function updateEvent() {
  if (
    !editEventTitle.value ||
    !editEventTimeFrom.value ||
    !editEventTimeTo.value
  ) {
    alert('Please fill all fields')
    return
  }

  if (
    !validateTimeFormat(editEventTimeFrom.value) ||
    !validateTimeFormat(editEventTimeTo.value)
  ) {
    alert('Invalid time format')
    return
  }

  try {
    await taskStore.updateEvent({
      title: editEventTitle.value,
      timeFrom: editEventTimeFrom.value,
      timeTo: editEventTimeTo.value,
      task_id: editingEvent.value.task_id,
    })

    // Reset form
    isEditMode.value = false
    editingEvent.value = null
    editEventTitle.value = ''
    editEventTimeFrom.value = ''
    editEventTimeTo.value = ''
  } catch (error) {
    console.error(error)
    alert('Failed to update event')
  }
}

function selectDay(day, dayClass, event) {
  // Prevent selection of prev-date and next-date days
  if (dayClass.includes('prev-date') || dayClass.includes('next-date')) {
    return
  }

  taskStore.setActiveDay(day)
  document.querySelectorAll('.day').forEach(dayElement => {
    dayElement.classList.remove('selected')
  })
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected')
  }
}

function prevMonth() {
  if (taskStore.month > 0) {
    taskStore.setMonth(taskStore.month - 1)
  } else {
    taskStore.setMonth(11)
    taskStore.setYear(taskStore.year - 1)
  }
}

function nextMonth() {
  if (taskStore.month < 11) {
    taskStore.setMonth(taskStore.month + 1)
  } else {
    taskStore.setMonth(0)
    taskStore.setYear(taskStore.year + 1)
  }
}

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
  <div class="calendar-container mb-5 mt-5">
    <div class="calendar">
      <div class="month">
        <button @click="prevMonth">&lt;</button>
        <div class="date">
          {{ months[taskStore.month] }} {{ taskStore.year }}
        </div>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="weekdays">
        <div
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
        >
          {{ day }}
        </div>
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
        Events for {{ taskStore.activeDay }} {{ months[taskStore.month] }}
        {{ taskStore.year }}
      </h3>
      <div class="events-list">
        <div v-if="taskStore.activeEvents.length === 0" class="no-events">
          No events scheduled
        </div>
        <div
          v-else
          v-for="(event, index) in taskStore.activeEvents"
          :key="index"
          class="event-item"
        >
          <div class="event-content" @click="startEditEvent(event, index)">
            <h4>{{ event.title }}</h4>
            <p>{{ event.time }}</p>
          </div>
          <button
            @click="taskStore.removeEvent(event.task_id)"
            class="remove-event-btn"
            title="Remove Event"
          >
            ×
          </button>
        </div>
        <div v-if="isEditMode" class="edit-event-form">
          <h4>Edit Event</h4>
          <input
            v-model="editEventTitle"
            placeholder="Event Title"
            maxlength="60"
          />
          <input
            v-model="editEventTimeFrom"
            placeholder="Start Time (HH:MM)"
            pattern="[0-9]{2}:[0-9]{2}"
          />
          <input
            v-model="editEventTimeTo"
            placeholder="End Time (HH:MM)"
            pattern="[0-9]{2}:[0-9]{2}"
          />
          <div class="edit-buttons">
            <button @click="updateEvent" class="save-btn">Save Changes</button>
            <button @click="isEditMode = false" class="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <button @click="toggleAddEvent" class="add-event-btn">Add Event</button>
      <div v-if="isAddEventVisible" class="add-event-form">
        <input
          v-model="newEventTitle"
          placeholder="Event Title"
          maxlength="60"
        />
        <input
          v-model="newEventTimeFrom"
          placeholder="Start Time (HH:MM)"
          pattern="[0-9]{2}:[0-9]{2}"
        />
        <input
          v-model="newEventTimeTo"
          placeholder="End Time (HH:MM)"
          pattern="[0-9]{2}:[0-9]{2}"
        />
        <button @click="addEvent">Save Event</button>
      </div>
    </div>
  </div>
</template>
