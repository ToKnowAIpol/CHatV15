
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsSignUp(searchParams.get('signup') === 'true');
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get the current URL origin
      const origin = window.location.origin;
      
      // Use the current origin for the redirect URL
      // This ensures it works with any Vercel deployment URL
      const redirectUrl = `${origin}/dashboard`;
      
      console.log('Using redirect URL for email auth:', redirectUrl);

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        
        console.log('Sign up response:', { data, error });
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Sign in response:', { data, error });
        
        if (error) throw error;
        
        // Check if session was created successfully
        if (data?.session) {
          console.log('Authentication successful, redirecting to dashboard');
          navigate('/dashboard');
        } else {
          throw new Error('Failed to create session');
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Get the current URL origin
      const origin = window.location.origin;
      
      // Use the current origin for the redirect URL
      // This ensures it works with any Vercel deployment URL
      // Use the same redirect URL as email login - with /dashboard path
      const redirectUrl = `${origin}/dashboard`;
      
      console.log('Using redirect URL for Google auth:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      
      console.log('Google sign in response:', { data, error });
      
      if (error) throw error;
      
      // No need to navigate here as Supabase will handle the redirect
      // But we'll add a fallback just in case
      setTimeout(() => {
        // If we're still on this page after 5 seconds, try to navigate manually
        console.log('Fallback navigation to dashboard');
        navigate('/dashboard');
      }, 5000);
      
    } catch (error: any) {
      console.error('Google authentication error:', error);
      toast({
        title: "Google Sign In Error",
        description: error.message || 'Failed to sign in with Google',
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp
              ? 'Enter your email below to create your account'
              : 'Enter your email to sign in to your account'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          type="button" 
          className="w-full" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </Button>
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              navigate(isSignUp ? '/auth' : '/auth?signup=true', { replace: true });
            }}
            className="text-sm"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
