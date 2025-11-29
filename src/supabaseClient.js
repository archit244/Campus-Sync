import { createClient } from '@supabase/supabase-js'

// 1. Paste your Project URL here
const supabaseUrl = 'https://jhzhdbzqkxyqmlewuodg.supabase.co'

// 2. Paste your 'anon public' key here (it's a long string starting with ey...)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoemhkYnpxa3h5cW1sZXd1b2RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjM0NjUsImV4cCI6MjA3OTk5OTQ2NX0.7jdp8pSuDinfE-InH2RZXbkTnsHYrKN9sbjIXELeOvM'

export const supabase = createClient(supabaseUrl, supabaseKey)