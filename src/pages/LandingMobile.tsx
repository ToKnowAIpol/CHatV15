import { useNavigate } from "react-router-dom";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingMobile() {
  const navigate = useNavigate();

  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    { text: "Aceternity.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mb-2">
          The road to freedom starts from here
        </p>
        
        <TypewriterEffectSmooth words={words} />
        
        <div className="flex flex-col space-y-4 mt-8">
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
