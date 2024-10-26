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
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        this.user = user
        const { data: profile, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', this.user.id)
          .single()

        if (error) throw error

        if (profile) this.profile = profile
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
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      if (user) {
        this.user = user
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .eq('id', this.user.id)
          .single()

        if (profile) this.profile = profile
      }
    },

    // Sign Out
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      this.user = null
      this.profile = null
    },

    // Password Reset: Send Reset Email
    async passwordReset(email) {
      try {
        const production_url =
          import.meta.env.VITE_PROD_URL ||
          'http://localhost:5173/auth/password-update'
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(
          email,
          {
            redirectTo: production_url, // Switching between production or development
          },
        )
        if (error) throw error
      } catch (error) {
        console.error('Password reset failed:', error.message)
        throw error
      }
    },

    // Password Reset: Update Password
    async updatePassword(newPassword) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        })
        if (error) throw error
      } catch (error) {
        console.error('Update password failed:', error.message)
        throw error
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
  },
})
