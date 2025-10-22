import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfwbrnpvrfesepmhbadk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2JybnB2cmZlc2VwbWhiYWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTA3MjksImV4cCI6MjA3NjcyNjcyOX0.4Hjwq6gCTN03MYAOvU8FCXsijgXgKlvRogkDKNByRQU';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
