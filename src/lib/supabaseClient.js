import { createClient } from '@supabase/supabase-js'

const S_URL = import.meta.env.VITE_SUPABASE_URL
const S_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(S_URL, S_KEY)
