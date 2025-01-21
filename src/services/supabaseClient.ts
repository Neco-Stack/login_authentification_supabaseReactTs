import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ezzvlybhqhbggmwddrgm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6enZseWJocWhiZ2dtd2RkcmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NjI5OTksImV4cCI6MjA1MzAzODk5OX0.p3MengRQNP8y_HqcVSF-vQGLVipIHozeljAzd_bd9rw'
export const supabase = createClient(supabaseUrl, supabaseKey)