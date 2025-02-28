
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log('[AuthProvider] Initializing, checking for session');
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthProvider] Initial session check:', session ? 'Session found' : 'No session');
      if (session) {
        console.log('[AuthProvider] User ID:', session.user.id);
        console.log('[AuthProvider] User email:', session.user.email);
      }
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthProvider] Auth state changed, event:', event);
      console.log('[AuthProvider] New session:', session ? 'Session exists' : 'No session');
      if (session) {
        console.log('[AuthProvider] User ID:', session.user.id);
      }
      setSession(session);
    });

    // Log current URL for debugging
    console.log('[AuthProvider] Current location:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });

    return () => subscription.unsubscribe();
  }, [location]);

  const signOut = async () => {
    console.log('[AuthProvider] Signing out');
    await supabase.auth.signOut();
  };

  if (loading) {
    console.log('[AuthProvider] Still loading, showing loading state');
    return <div>Loading...</div>;
  }

  console.log('[AuthProvider] Rendering with session:', session ? 'Session exists' : 'No session');
  return (
    <AuthContext.Provider value={{ session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('[RequireAuth] Checking authentication for path:', location.pathname);
    console.log('[RequireAuth] URL details:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state
    });
    
    // Check for access_token in URL
    const hasAccessToken = 
      location.search.includes('access_token') || 
      location.hash.includes('access_token') ||
      location.pathname.includes('access_token');
    
    console.log('[RequireAuth] Has access token in URL:', hasAccessToken);
    console.log('[RequireAuth] Current session:', session ? 'Session exists' : 'No session');

    // Add a small delay to ensure session is properly checked
    const timer = setTimeout(() => {
      console.log('[RequireAuth] Finished initial check delay');
      setIsChecking(false);
      
      // If URL has access token but no session yet, wait a bit longer
      if (hasAccessToken && !session) {
        console.log('[RequireAuth] Access token found in URL, waiting for session...');
        // Wait a bit longer for the session to be established
        setTimeout(() => {
          console.log('[RequireAuth] Extended wait completed, session:', session ? 'exists' : 'still not established');
          if (!session) {
            console.log('[RequireAuth] Session still not established, redirecting to auth');
            navigate('/auth', { replace: true });
          } else {
            console.log('[RequireAuth] Session established during extended wait, navigating to dashboard');
            navigate('/dashboard', { replace: true });
          }
        }, 3000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [session, location, navigate]);

  // Show loading state while checking session
  if (isChecking) {
    console.log('[RequireAuth] Still checking, showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Verifying authentication...</p>
          <p className="text-sm text-muted-foreground mt-2">URL: {location.pathname}{location.search}{location.hash}</p>
        </div>
      </div>
    );
  }

  // Redirect to auth page if no session
  if (!session) {
    console.log('[RequireAuth] No session found, redirecting to auth page');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log('[RequireAuth] Session found, rendering protected content');
  console.log('[RequireAuth] User ID:', session.user.id);
  console.log('[RequireAuth] User email:', session.user.email);
  return <>{children}</>;
}

export function useAuth() {
  return useContext(AuthContext);
}
