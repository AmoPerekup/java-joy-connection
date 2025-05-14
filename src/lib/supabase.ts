
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and anon key that will be available
// after connecting your Lovable project to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client that shows messages when not connected
const createMockClient = () => {
  const notConnectedMessage = () => {
    console.error('Supabase not connected yet. Please connect to Supabase first using the green button in the top-right corner.');
    return Promise.reject(new Error('Supabase not connected yet'));
  };
  
  // Return a mock client with similar methods but that just shows error messages
  return {
    from: () => ({
      select: () => ({ 
        order: () => notConnectedMessage(), 
        eq: () => notConnectedMessage(),
        single: () => notConnectedMessage()
      }),
      insert: () => ({ select: () => notConnectedMessage(), single: () => notConnectedMessage() }),
      update: () => ({ eq: () => notConnectedMessage(), select: () => notConnectedMessage() }),
      delete: () => ({ eq: () => notConnectedMessage() }),
    }),
    auth: {
      signUp: () => notConnectedMessage(),
      signIn: () => notConnectedMessage(),
      signOut: () => notConnectedMessage(),
    }
  };
};

// Only create the real client if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or anonymous key. Please connect to Supabase first.');
}
