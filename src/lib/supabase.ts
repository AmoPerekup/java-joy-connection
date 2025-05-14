
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and anon key that will be available
// after connecting your Lovable project to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or anonymous key. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
