
import { createClient } from '@supabase/supabase-js'

// 1. Paste your Project URL here
const supabaseUrl = 'https://jhzhdbzqkxyqmlewuodg.supabase.co'

// 2. Paste your 'anon public' key here (it's a long string starting with ey...)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoemhkYnpxa3h5cW1sZXd1b2RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjM0NjUsImV4cCI6MjA3OTk5OTQ2NX0.7jdp8pSuDinfE-InH2RZXbkTnsHYrKN9sbjIXELeOvM'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testSignup() {
    console.log('Attempting signup with liked_posts...')

    const newProfile = {
        email: 'test_debug_' + Date.now() + '@example.com',
        password: 'password123',
        name: 'Debug User',
        university: 'Test University',
        degree: 'B.Tech (1st Year)',
        karma: 50,
        bio: 'Student at Campus Sync',
        interested_tags: [],
        liked_posts: [], // This is the field that requires the new column
    };

    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();

        if (error) {
            console.error('Signup Error:', error);
        } else {
            console.log('Signup Success:', data);
        }
    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

testSignup();
