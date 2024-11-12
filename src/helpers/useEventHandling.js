import { ref } from 'vue'

export function useEventHandling(taskStore) {
  // -----------------------------------------> UI state
  const newEventTitle = ref('')
  const newEventTimeTo = ref('')
  const newEventTimeFrom = ref('')
  const editEventTimeFrom = ref('')
  const editEventTimeTo = ref('')
  const editingEvent = ref(null)
  const editEventTitle = ref('')
  const isEditMode = ref(false)
  const isAddEventVisible = ref(false)

  // ----------------------------------------->Event handlers
  async function handleAddEvent() {
    try {
      const eventData = {
        title: newEventTitle.value,
        timeFrom: newEventTimeFrom.value,
        timeTo: newEventTimeTo.value,
        day: taskStore.activeDay,
        month: taskStore.month + 1,
        year: taskStore.year,
      }

      await taskStore.addEvent(eventData)
      resetAddForm()
    } catch (error) {
      console.error('Error in addEvent:', error)
    }
  }

  function handleEditStart(event, index) {
    isEditMode.value = true
    editingEvent.value = { ...event, index }
    editEventTitle.value = event.title
    const [timeFrom, timeTo] = event.time.split(' - ')
    editEventTimeFrom.value = timeFrom.split(':').slice(0, 2).join(':')
    editEventTimeTo.value = timeTo.split(':').slice(0, 2).join(':')
  }

  async function handleUpdateEvent() {
    try {
      await taskStore.updateEvent(editingEvent.value.task_id, {
        title: editEventTitle.value,
        timeFrom: editEventTimeFrom.value,
        timeTo: editEventTimeTo.value,
      })
      resetEditForm()
    } catch (error) {
      console.error('Update event error:', error)
    }
  }

  // -----------------------------------------> Reset form handlers
  function resetAddForm() {
    newEventTitle.value = ''
    newEventTimeFrom.value = ''
    newEventTimeTo.value = ''
    isAddEventVisible.value = false
  }

  function resetEditForm() {
    isEditMode.value = false
    editingEvent.value = null
    editEventTitle.value = ''
    editEventTimeFrom.value = ''
    editEventTimeTo.value = ''
  }

  return {
    newEventTitle,
    newEventTimeTo,
    newEventTimeFrom,
    editEventTimeFrom,
    editEventTimeTo,
    editingEvent,
    editEventTitle,
    isEditMode,
    isAddEventVisible,
    handleAddEvent,
    handleEditStart,
    handleUpdateEvent,
    resetAddForm,
    resetEditForm,
  }
}
