import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    // Fetching user from database "Supabase" built in auth.user
    async fetchUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          this.user = user
          // Fetch the profile data
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) throw error
          if (profile) this.profile = profile
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        throw error
      }
    },

    // Update profile
    async updateProfile(updates) {
      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      this.profile = { ...this.profile, ...updates }
    },

    // Sign Up
    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
        if (error) throw error
        if (user) {
          this.user = user
          // Create a profile entry for the new user with email
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: this.user.id,
                username: email,
                email: email, // Include email in profile
              },
            ])
          if (profileError) throw profileError
        }
      } catch (error) {
        console.error('Sign Up Error:', error.message)
        throw error
      }
    },

    // Sign In
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) throw error
      if (data.user) {
        this.user = data.user
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .eq('id', this.user.id)
          .single()

        if (profile) this.profile = profile
        await this.fetchUser()
      }
    },

    // Sign Out
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      this.user = null
      this.profile = null
    },
  },
  getters: {
    displayName: state =>
      state.profile?.full_name || state.user?.email || 'Guest',
    isLoggedIn: state => !!state.user,
  },
})
