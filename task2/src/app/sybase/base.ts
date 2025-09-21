import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vjjfprpfcvvfvuitrxkj.supabase.co'
const supabaseKey = "sb_publishable_Jh2eaPexeJ07-JDdsXr4Hg_0HB3SGym"
const supabase = createClient(supabaseUrl, supabaseKey)


export { supabase };