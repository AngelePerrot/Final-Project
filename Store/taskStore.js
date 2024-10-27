import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false })
      this.tasks = tasks
    },
  },
})
