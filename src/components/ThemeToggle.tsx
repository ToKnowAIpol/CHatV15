import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useThemeContext } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  
  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
}
