import React, { useEffect, useState } from 'react';
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
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsProcessing(true);
    console.log('[AuthCallback] Component mounted');
    console.log('[AuthCallback] Current URL:', window.location.href);
    console.log('[AuthCallback] Current domain:', window.location.hostname);
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
    
    // Also check for code parameter which is used in PKCE flow
    const hasCode = location.search.includes('code=');
    
    console.log('[AuthCallback] Has access token in URL:', hasAccessToken);
    console.log('[AuthCallback] Has code parameter in URL:', hasCode);
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

    // Function to extract access token from URL hash
    const extractAccessToken = () => {
      if (location.hash && location.hash.includes('access_token')) {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        return hashParams.get('access_token');
      }
      return null;
    };

    // If we have an access token or code in the URL, try to get the session
    if (hasAccessToken || hasCode) {
      console.log('[AuthCallback] Detected authentication parameters, checking session');
      
      // If we have an access token in the hash, try to set the session directly
      const accessToken = extractAccessToken();
      if (accessToken) {
        console.log('[AuthCallback] Access token found in URL hash, attempting to set session');
        
        // Try to set the session with the access token
        // This is a workaround for when the automatic session setting doesn't work
        try {
          // Extract other parameters from the hash
          const hashParams = new URLSearchParams(location.hash.substring(1));
          const refreshToken = hashParams.get('refresh_token');
          const expiresIn = hashParams.get('expires_in');
          const tokenType = hashParams.get('token_type') || 'bearer';
          
          console.log('[AuthCallback] Access token extracted from URL hash');
          console.log('[AuthCallback] Token type:', tokenType);
          console.log('[AuthCallback] Expires in:', expiresIn);
          console.log('[AuthCallback] Has refresh token:', refreshToken ? 'Yes' : 'No');
          
          // Manually set the session if needed
          if (accessToken && !session) {
            console.log('[AuthCallback] Attempting to manually set session with access token');
            
            // Try to set the auth session manually
            supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            }).then(({ data, error }) => {
              if (error) {
                console.error('[AuthCallback] Error setting session manually:', error);
                setError('Failed to set session with access token');
              } else if (data.session) {
                console.log('[AuthCallback] Session set manually, redirecting to dashboard');
                navigate('/dashboard', { replace: true });
                return; // Exit early since we're redirecting
              }
            });
          }
          
          // Continue with the normal flow to check for a session
        } catch (error) {
          console.error('[AuthCallback] Error setting session with access token:', error);
          setError('Failed to set session with access token');
        }
      }
      
      // If we have a code parameter, we need to exchange it for a session
      if (hasCode && !hasAccessToken) {
        console.log('[AuthCallback] Code parameter detected, attempting to exchange for session');
        
        // Extract the code from the URL
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        if (code) {
          console.log('[AuthCallback] Code extracted from URL:', code.substring(0, 10) + '...');
          
          // The Supabase client should automatically handle the code exchange
          // We just need to wait for the session to be established
          console.log('[AuthCallback] Waiting for Supabase to process the code...');
        }
      }
      
      // Try to get the session from Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('[AuthCallback] Session check result:', session ? 'Session found' : 'No session');
        
        if (session) {
          console.log('[AuthCallback] User authenticated, redirecting to dashboard');
          navigate('/dashboard', { replace: true });
        } else {
          // If we have a code but no session yet, Supabase might still be processing the authentication
          // Let's wait a bit longer before redirecting
          console.log('[AuthCallback] No session found yet, waiting for Supabase to process authentication...');
          
          // Set a timeout to check again after a short delay
          setTimeout(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
              console.log('[AuthCallback] Delayed session check result:', session ? 'Session found' : 'No session');
              
              if (session) {
                console.log('[AuthCallback] User authenticated after delay, redirecting to dashboard');
                navigate('/dashboard', { replace: true });
              } else {
                // Try one more time with a longer delay
                setTimeout(() => {
                  supabase.auth.getSession().then(({ data: { session } }) => {
                    console.log('[AuthCallback] Final session check result:', session ? 'Session found' : 'No session');
                    
                    if (session) {
                      console.log('[AuthCallback] User authenticated after final check, redirecting to dashboard');
                      navigate('/dashboard', { replace: true });
                    } else {
                      console.log('[AuthCallback] No session found after multiple attempts, redirecting to auth page');
                      navigate('/auth', { replace: true });
                    }
                  });
                }, 3000); // Wait 3 more seconds before final check
              }
            });
          }, 2000); // Wait 2 seconds before first recheck
        }
      });
    } else if (session) {
      // If we already have a session, redirect to dashboard
      console.log('[AuthCallback] Already authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    } else {
      // If we're on the root path with no token and no session, redirect to auth page
      console.log('[AuthCallback] No token or session, redirecting to auth page');
      navigate('/auth', { replace: true });
    }
  }, [location, navigate, session]);

  // Update the UI based on processing status and errors
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {isProcessing && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        )}
        
        {error ? (
          <>
            <p className="text-red-500 font-semibold">Authentication Error</p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              onClick={() => navigate('/auth', { replace: true })}
            >
              Return to Login
            </button>
          </>
        ) : (
          <>
            <p>Processing authentication...</p>
            <p className="text-sm text-muted-foreground mt-2">
              This may take a few moments. You will be redirected automatically.
            </p>
          </>
        )}
        
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded text-left overflow-hidden text-xs">
          <p className="font-mono break-all">URL: {location.pathname}{location.search}{location.hash}</p>
        </div>
      </div>
    </div>
  );
}
