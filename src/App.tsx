
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider, RequireAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SplashCursor />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/resources" element={<Resources />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              {/* Add a route that handles the dashboard with access token */}
              <Route
                path="/dashboard/:params"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
