import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * AuthCallback component handles the authentication callback from OAuth providers
 * It checks for access tokens in the URL and redirects to the dashboard if authenticated
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();

  useEffect(() => {
    console.log('[AuthCallback] Component mounted');
    console.log('[AuthCallback] Current URL:', window.location.href);
    console.log('[AuthCallback] Location details:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });

    // Check if this is a callback from OAuth provider
    const hasAccessToken = 
      location.search.includes('access_token') || 
      location.hash.includes('access_token') ||
      location.pathname.includes('access_token');
    
    console.log('[AuthCallback] Has access token in URL:', hasAccessToken);
    console.log('[AuthCallback] Current session:', session ? 'exists' : 'none');

    // Function to extract and log parameters from URL
    const logUrlParams = () => {
      // Check for query params
      const searchParams = new URLSearchParams(location.search);
      const searchEntries = Array.from(searchParams.entries());
      if (searchEntries.length > 0) {
        console.log('[AuthCallback] URL search parameters:', Object.fromEntries(searchEntries));
      }
      
      // Check for hash params (common in OAuth redirects)
      if (location.hash) {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const hashEntries = Array.from(hashParams.entries());
        if (hashEntries.length > 0) {
          console.log('[AuthCallback] URL hash parameters:', Object.fromEntries(hashEntries));
        }
      }
    };

    logUrlParams();

    // If we have an access token in the URL, try to get the session
    if (hasAccessToken) {
      console.log('[AuthCallback] Detected access token, checking session');
      
      // Try to get the session from Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('[AuthCallback] Session check result:', session ? 'Session found' : 'No session');
        
        if (session) {
          console.log('[AuthCallback] User authenticated, redirecting to dashboard');
          navigate('/dashboard', { replace: true });
        } else {
          console.log('[AuthCallback] No session found despite access token, redirecting to auth page');
          navigate('/auth', { replace: true });
        }
      });
    } else if (session) {
      // If we already have a session, redirect to dashboard
      console.log('[AuthCallback] Already authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    } else {
      // If we're on the root path with no token and no session, show the landing page
      console.log('[AuthCallback] No token or session, showing landing page');
      // We don't need to navigate since the Landing component will be rendered
    }
  }, [location, navigate, session]);

  // Show a loading indicator while processing
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Processing authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">URL: {location.pathname}{location.search}{location.hash}</p>
      </div>
    </div>
  );
}
