
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
    // Check for access_token in URL
    const hasAccessToken = 
      location.search.includes('access_token') || 
      location.hash.includes('access_token') ||
      location.pathname.includes('access_token');

    // Add a small delay to ensure session is properly checked
    const timer = setTimeout(() => {
      setIsChecking(false);
      
      // If URL has access token but no session yet, wait a bit longer
      if (hasAccessToken && !session) {
        console.log('Access token found in URL, waiting for session...');
        // Wait a bit longer for the session to be established
        setTimeout(() => {
          if (!session) {
            console.log('Session still not established, redirecting to auth');
            navigate('/auth', { replace: true });
          }
        }, 2000);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [session, location, navigate]);

  // Show loading state while checking session
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth page if no session
  if (!session) {
    console.log('No session found, redirecting to auth page');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log('Session found, rendering protected content');
  return <>{children}</>;
}

export function useAuth() {
  return useContext(AuthContext);
}
