import { createClient } from '@supabase/supabase-js';

// Create a default empty client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://empty.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'empty-key'
);

export { supabase }; 