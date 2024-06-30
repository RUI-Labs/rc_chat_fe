import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ojvozirqgxgiztlmasrm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdm96aXJxZ3hnaXp0bG1hc3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg5MTY5OSwiZXhwIjoyMDI4NDY3Njk5fQ.RnuTetoEW2cr_2yHfiTttQcidqe3Trour21lyrTRYxA";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase as s };
