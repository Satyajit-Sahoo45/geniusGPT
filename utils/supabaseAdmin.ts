import { createClient } from "@supabase/supabase-js";

import { Database } from "../types_db";

const supabaseUrl = "https://iehgkylvtmkungcvzrni.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
