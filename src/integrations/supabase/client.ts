// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ihkbkjpjlyndzsbcsfax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloa2JranBqbHluZHpzYmNzZmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzU4ODMsImV4cCI6MjA1MDIxMTg4M30.gksTwFqX8Pi6mrXuDrRUWqwufeYRr6d1eOCskC3Vmvs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);