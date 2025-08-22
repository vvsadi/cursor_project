# Setup Guide for Dandi AI Application

## Environment Configuration

To fix the "TypeError: fetch failed" error and display API keys properly, you need to configure Supabase environment variables.

### 1. Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. Get your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret)

### 3. Restart your development server:

```bash
npm run dev
```

## Current Status

The application is currently configured to work without Supabase by providing mock data. This means:

- ✅ API keys will display (mock data)
- ✅ No more "fetch failed" errors
- ✅ Basic functionality works
- ❌ Data won't persist between sessions
- ❌ No real database integration

## Mock Data

When Supabase is not configured, the app shows these sample API keys:
- OpenAI API Key
- Anthropic API Key  
- Google AI API Key

## Next Steps

1. **For Development**: The mock data setup is sufficient for testing
2. **For Production**: Set up Supabase and configure environment variables
3. **For Testing**: The current setup allows you to test all features

## Troubleshooting

If you still see errors:
1. Check the browser console for specific error messages
2. Ensure the development server is running (`npm run dev`)
3. Verify the API routes are accessible at `/api/keys`
