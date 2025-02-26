
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Your all-in-one solution for managing conversations and visitors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="min-w-[200px]"
          >
            Sign In
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/auth?signup=true')}
            className="min-w-[200px]"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
