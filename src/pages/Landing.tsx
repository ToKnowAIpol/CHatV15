import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StickyScrollRevealDemo } from "@/components/ui/sticky-scroll-demo";
import { useMobileDetect } from "@/hooks/use-mobile-detect";
import LandingMobile from "./LandingMobile";

export default function Landing() {
  const navigate = useNavigate();
  const isMobile = useMobileDetect();

  // Render mobile version for mobile devices
  if (isMobile) {
    return <LandingMobile />;
  }

  // Render desktop version for desktop devices
  return (
    <div className="h-screen w-screen overflow-hidden relative bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4 z-50 flex space-x-3">
        <button 
          className="px-3 py-1 text-sm rounded-md bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          onClick={() => navigate('/pricing')}
        >
          Cennik
        </button>
        <button 
          className="px-3 py-1 text-sm rounded-md bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          onClick={() => navigate('/resources')}
        >
          Zasoby
        </button>
      </div>
      
      {/* Full-screen Sticky Scroll */}
      <div className="h-full w-full">
        <StickyScrollRevealDemo />
      </div>
      
      {/* Buttons positioned at the bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-50 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
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
  );
}
