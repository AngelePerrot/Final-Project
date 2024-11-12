export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MONTHS = [
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

// -----------------------------------------> Time validation utility
export function validateTimeFormat(time) {
  if (!time) return false
  const [hours, minutes] = time.split(':')
  if (!hours || !minutes) return false

  const h = parseInt(hours)
  const m = parseInt(minutes)

  return h >= 0 && h < 24 && m >= 0 && m < 60
}

export function formatEventTime(time) {
  if (!time) return 'No time specified'
  const [start, end] = time.split(' - ')
  const formatTime = t => {
    if (!t) return ''
    return t.split(':').slice(0, 2).join(':')
  }
  return `${formatTime(start)} - ${formatTime(end)}`
}

// -----------------------------------------> Day selection utility
export function useDaySelection(taskStore) {
  function selectDay(day, dayClass, event) {
    if (dayClass.includes('prev-date') || dayClass.includes('next-date')) return

    taskStore.setActiveDay(day)
    document
      .querySelectorAll('.day')
      .forEach(el => el.classList.remove('selected'))
    event?.currentTarget?.classList.add('selected')
  }

  return { selectDay }
}
