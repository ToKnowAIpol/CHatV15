
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

    return () => subscription.unsubscribe();
  }, []);

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

    // If we have an access token in the URL, handle it directly
    if (hasAccessToken) {
      console.log('[RequireAuth] Access token found in URL, redirecting to callback handler');
      navigate('/callback' + location.search + location.hash, { replace: true });
      return;
    }

    // Check session immediately and then double-check after a delay
    const checkSession = async () => {
      try {
        console.log('[RequireAuth] Checking session with Supabase directly');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[RequireAuth] Error checking session:', error);
          return null;
        }
        
        if (data.session) {
          console.log('[RequireAuth] Session found via direct check:', data.session.user.id);
          return data.session;
        }
        
        return null;
      } catch (e) {
        console.error('[RequireAuth] Exception checking session:', e);
        return null;
      }
    };

    // Add a small delay to ensure session is properly checked
    const timer = setTimeout(async () => {
      console.log('[RequireAuth] Performing additional session check');
      
      // If we don't have a session from context, try to get it directly
      if (!session) {
        const directSession = await checkSession();
        if (directSession) {
          console.log('[RequireAuth] Found session via direct check, continuing');
          setIsChecking(false);
          return;
        }
      }
      
      setIsChecking(false);
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
