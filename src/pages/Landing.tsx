
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StickyScrollRevealDemo } from "@/components/ui/sticky-scroll-demo";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
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
