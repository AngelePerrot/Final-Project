<script setup>
import { computed } from 'vue'
import { validateTimeFormat } from '@/helpers/calendarUtils'

const props = defineProps({
  mode: {
    type: String,
    default: 'add',
  },
  title: String,
  timeFrom: String,
  timeTo: String,
})

const emit = defineEmits([
  'submit',
  'cancel',
  'update:title',
  'update:timeFrom',
  'update:timeTo',
])

// -----------------------------------------> Computed properties with getters and setters
const eventTitle = computed({
  get: () => props.title,
  set: value => emit('update:title', value),
})

const eventTimeFrom = computed({
  get: () => props.timeFrom,
  set: value => emit('update:timeFrom', value),
})

const eventTimeTo = computed({
  get: () => props.timeTo,
  set: value => emit('update:timeTo', value),
})

function handleSubmit() {
  if (!props.title || !props.timeFrom || !props.timeTo) {
    alert('Please fill all fields')
    return
  }

  if (
    !validateTimeFormat(props.timeFrom) ||
    !validateTimeFormat(props.timeTo)
  ) {
    alert('Invalid time format')
    return
  }

  emit('submit')
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div :class="`${mode}-event-form`">
      <h4>{{ mode === 'add' ? 'Add Event' : 'Edit Event' }}</h4>

      <label>What event is going to happen?</label>
      <input v-model="eventTitle" placeholder="Event Title" maxlength="60" />

      <label>When does the event start?</label>
      <input
        v-model="eventTimeFrom"
        placeholder="Start Time (HH:MM)"
        pattern="[0-9]{2}:[0-9]{2}"
      />

      <label>When does the event end?</label>
      <input
        v-model="eventTimeTo"
        placeholder="End Time (HH:MM)"
        pattern="[0-9]{2}:[0-9]{2}"
      />

      <div class="form-buttons">
        <button @click="handleSubmit">
          {{ mode === 'add' ? 'Save Event' : 'Save Changes' }}
        </button>
        <button v-if="mode === 'edit'" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
