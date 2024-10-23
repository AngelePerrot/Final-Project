import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user()
      this.user = user
    },
    // SIGNUP BLOCK
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) throw error
      if (user) this.user = user
    },
    // SIGNIN BLOCK
    async signIn(email, password) {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: 'someone@email.com',
        password: 'gauXNHiaSHDiGrYFcGHD',
      })
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage, // Saving in localstorage instead of supabase
        },
      ],
    },
  },
})
