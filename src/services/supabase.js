import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ezbbeeyayjcvxhpkcjbs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YmJlZXlheWpjdnhocGtjamJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMTg0MzYsImV4cCI6MjAyNjg5NDQzNn0.JwANDmmw-pfGdYJayLNw5wQY91bOuzAxrChqInHwu4Y';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
