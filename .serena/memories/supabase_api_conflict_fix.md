# Supabase API Naming Conflict Fix

## Issue Found
The frontend compilation was failing due to:
1. **Duplicate supabase imports/definitions**: There was already `import { supabase } from '@/lib/supabase'` but I added another `const supabase = createClient(...)` 
2. **Duplicate leaderboard functions**: Two different `leaderboard` functions in the groupApi object

## Root Cause
When I added the missing API configuration, I didn't check for existing Supabase imports and accidentally created naming conflicts.

## Fix Applied
1. **Removed redundant Supabase config**: Removed the duplicate createClient() call and kept the existing import
2. **Removed duplicate leaderboard function**: Kept the newer one that uses the correct backend API endpoints
3. **Kept API_BASE_URL configuration**: This was needed for the backend API calls

## Result
- Frontend should now compile without "supabase is defined multiple times" error
- Groups page should load and make proper API calls to backend
- All group functionality (leaderboard, members, details) should work