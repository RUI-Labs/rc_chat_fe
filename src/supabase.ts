import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = "https://ojvozirqgxgiztlmasrm.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTE2OTksImV4cCI6MjAyODQ2NzY5OX0.67EZHcTdMsVFc9XF2BC1AlrcV-I-H5ho9G_9HiqzO4E"
//console.log({SUPABASE_URL, SUPABASE_KEY})

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
