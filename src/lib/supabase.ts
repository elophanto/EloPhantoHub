import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Booking = {
  id?: string
  package_slug: string
  name: string
  email: string
  phone: string
  country: string
  date: string
  participants: number
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_intent_id?: string
  total_price: number
  created_at?: string
}
