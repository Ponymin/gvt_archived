import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odrmssmxalfztqdcqsoa.supabase.co'
const supabaseAnonKey = 'sb_publishable_oLbIlBNqyEGqylGrmOqBig_Ecq9vsS1'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
