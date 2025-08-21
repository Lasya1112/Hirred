import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseClient = async(supabaseAccessToken) => {
    return createClient(supabaseUrl,supabaseKey,{
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
            },
        },
    });
}

export default supabaseClient;
        