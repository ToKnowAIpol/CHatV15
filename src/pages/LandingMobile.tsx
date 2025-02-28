import { useNavigate } from "react-router-dom";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function LandingMobile() {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (session) {
      console.log('[LandingMobile] User is already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    { text: "Aceternity.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className="h-screen mobile-height-fix overflow-hidden bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4 z-10 flex space-x-3">
        <button 
          className="px-3 py-1 text-xs rounded-md bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          onClick={() => navigate('/pricing')}
        >
          Cennik
        </button>
        <button 
          className="px-3 py-1 text-xs rounded-md bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          onClick={() => navigate('/resources')}
        >
          Zasoby
        </button>
      </div>
      
      {/* Main Content - Perfectly Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mb-3">
          The road to freedom starts from here
        </p>
        
        <TypewriterEffectSmooth words={words} className="mb-8" />
        
        <div className="flex flex-col space-y-3 mt-6">
          <button 
            className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
            onClick={() => navigate('/auth')}
          >
            Join now
          </button>
          <button 
            className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
            onClick={() => navigate('/auth?signup=true')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
