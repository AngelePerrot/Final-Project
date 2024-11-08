import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          this.user = user

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

    async updateProfile(updates) {
      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      this.profile = { ...this.profile, ...updates }
    },

    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
        if (error) throw error
        if (user) {
          this.user = user
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: this.user.id,
                username: email,
                email: email,
              },
            ])
          if (profileError) throw profileError
        }
      } catch (error) {
        console.error('Sign Up Error:', error.message)
        throw error
      }
    },

    async signIn(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if (error) throw error
        if (data.user) {
          this.user = data.user
          
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select()
            .eq('id', this.user.id)
            .single()

          if (profileError || !profile) {
            // Create profile if it doesn't exist
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: this.user.id,
                  username: email,
                  email: email,
                  updated_at: new Date().toISOString(),
                },
              ])
            if (insertError) throw insertError
          } else {
            this.profile = profile
          }
          
          await this.fetchUser()
        }
      } catch (error) {
        console.error('Sign in error:', error)
        throw error
      }
    },

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
