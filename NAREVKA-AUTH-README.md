# Narevka.com Authentication Setup

This document provides instructions for setting up and testing authentication with Google OAuth on the narevka.com domain.

## Configuration Changes Made

1. **Supabase Configuration**
   - Site URL set to: `https://narevka.com`
   - Added redirect URLs:
     - `https://narevka.com`
     - `https://narevka.com/callback`
     - `https://narevka.com/dashboard`

2. **Google OAuth Configuration**
   - Added authorized redirect URI: `https://narevka.com/callback`

3. **Code Changes**
   - Enhanced logging in `Auth.tsx` for better debugging
   - Improved callback handling in `AuthCallback.tsx`
   - Added support for the `code` parameter in the authentication flow
   - Added multiple session checks with delays to handle authentication timing issues

## Helper Scripts

We've created several helper scripts to assist with configuration and testing:

1. **auth-narevka-test.js**
   - A test script to verify the authentication flow
   - Run with: `node auth-narevka-test.js`

2. **update-narevka-config.js**
   - A script to update Supabase configuration for the new domain
   - Requires a Supabase access token
   - Run with: `node update-narevka-config.js`

## Testing the Authentication Flow

1. **Deploy to Vercel**
   - Push the changes to your GitHub repository
   - Vercel will automatically deploy to narevka.com

2. **Test Email/Password Authentication**
   - Go to https://narevka.com/auth
   - Enter email and password
   - Click "Sign In" or "Sign Up"
   - You should be redirected to the dashboard after successful authentication

3. **Test Google Authentication**
   - Go to https://narevka.com/auth
   - Click "Sign in with Google"
   - Complete the Google authentication process
   - You should be redirected to the dashboard after successful authentication

## Troubleshooting

If you encounter issues with authentication:

1. **Check Browser Console**
   - Open browser developer tools (F12)
   - Go to the Console tab
   - Look for any errors related to authentication
   - The enhanced logging will provide detailed information about the authentication process

2. **Verify Configuration**
   - Ensure Supabase URL Configuration is correct
   - Verify Google OAuth redirect URIs are properly set
   - Check that the deployment has completed on Vercel

3. **Clear Browser Cache**
   - Sometimes authentication issues can be resolved by clearing cookies and cache
   - Try using an incognito/private browsing window for testing

4. **Check for CORS Issues**
   - Look for CORS-related errors in the browser console
   - Ensure all domains are properly configured in Supabase

## Authentication Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Auth Page  │────▶│Google OAuth │────▶│  Callback   │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │             │
                                        │  Dashboard  │
                                        │             │
                                        └─────────────┘
```

## Additional Resources

- [Supabase Authentication Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Domain Configuration](https://vercel.com/docs/concepts/projects/domains)
