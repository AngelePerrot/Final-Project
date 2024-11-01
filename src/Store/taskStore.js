import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    activeDay: new Date().getDate(),
    calendarDays: [],
    eventsArr: [],
  }),

  actions: {
    async fetchTasks() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('No user logged in')

        const { data: tasks, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', user.id)
          .order('id', { ascending: false })

        if (error) throw error
        this.tasks = tasks
        this.convertTasksToEvents()
        this.generateCalendarDays()
      } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
      }
    },

    convertTasksToEvents() {
      if (!this.tasks) return

      const groupedTasks = {}

      this.tasks.forEach(task => {
        const taskDate = new Date(task.inserted_at)
        const day = taskDate.getDate()
        const month = taskDate.getMonth() + 1
        const year = taskDate.getFullYear()
        const dateKey = `${year}-${month}-${day}`

        if (!groupedTasks[dateKey]) {
          groupedTasks[dateKey] = {
            day,
            month,
            year,
            events: [],
          }
        }

        groupedTasks[dateKey].events.push({
          title: task.task,
          time: `${task.start_time} - ${task.end_time}`,
          task_id: task.id,
          is_complete: task.is_complete,
        })
      })

      this.eventsArr = Object.values(groupedTasks)
    },

    async addEvent(eventData) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('No user logged in')

        const { error } = await supabase.from('todos').insert({
          task: eventData.title,
          start_time: eventData.timeFrom,
          end_time: eventData.timeTo,
          user_id: user.id,
          inserted_at: new Date(
            eventData.year,
            eventData.month - 1,
            eventData.day,
          ).toISOString(),
        })

        if (error) throw error
        await this.fetchTasks()
      } catch (error) {
        console.error('Error adding event:', error)
        throw error
      }
    },

    async updateEvent(eventId, updatedData) {
      const { error } = await supabase
        .from('todos')
        .update({
          task: updatedData.title,
          start_time: updatedData.timeFrom,
          end_time: updatedData.timeTo,
        })
        .eq('id', eventId)

      if (error) throw error
      await this.fetchTasks()
    },

    async removeEvent(task_id) {
      const { error } = await supabase.from('todos').delete().eq('id', task_id)

      if (error) throw error
      await this.fetchTasks()
    },

    setMonth(month) {
      this.month = month
      this.generateCalendarDays()
    },

    setYear(year) {
      this.year = year
      this.generateCalendarDays()
    },

    setActiveDay(day) {
      this.activeDay = day
    },

    generateCalendarDays() {
      const firstDay = new Date(this.year, this.month, 1)
      const lastDay = new Date(this.year, this.month + 1, 0)
      const prevLastDay = new Date(this.year, this.month, 0)
      const firstDayIndex = firstDay.getDay()
      const lastDayIndex = lastDay.getDay()
      const nextDays = 7 - lastDayIndex - 1

      let days = []

      // Previous month's days
      for (let x = firstDayIndex; x > 0; x--) {
        days.push({
          day: prevLastDay.getDate() - x + 1,
          class: 'prev-date',
        })
      }

      // Current month's days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        let isToday =
          i === new Date().getDate() &&
          this.month === new Date().getMonth() &&
          this.year === new Date().getFullYear()

        // Check if the day has events
        let hasEvent = this.eventsArr.some(
          event =>
            event.day === i &&
            event.month === this.month + 1 &&
            event.year === this.year,
        )

        days.push({
          day: i,
          class: `${isToday ? 'today' : ''} ${hasEvent ? 'event' : ''}`,
        })
      }

      // Next month's days
      for (let j = 1; j <= nextDays; j++) {
        days.push({
          day: j,
          class: 'next-date',
        })
      }

      this.calendarDays = days
    },
  },

  getters: {
    activeEvents: state => {
      return (
        state.eventsArr.find(
          event =>
            event.day === state.activeDay &&
            event.month === state.month + 1 &&
            event.year === state.year,
        )?.events || []
      )
    },
  },
})
