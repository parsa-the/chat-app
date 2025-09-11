import { createClient } from "@supabase/supabase-js";
const supabaseUrl="";
const supabaseAnonkey="";
export const supabase = createClient(supabaseUrl,supabaseAnonkey)
