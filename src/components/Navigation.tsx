import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, BarChart3, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import mitLogo from "@/assets/mit-logo.jpg";

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Home", icon: BookOpen },
    { path: "/student", label: "Student Portal", icon: FileText },
    { path: "/teacher", label: "Teacher Portal", icon: Users },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="bg-card border-b shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src={mitLogo} 
                alt="MIT WPU Logo" 
                className="w-10 h-8 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-foreground hidden sm:inline">
                MIT-WPU Assignment Portal
              </span>
              <span className="text-lg font-bold text-foreground sm:hidden">
                MIT-WPU
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="transition-smooth"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2 transition-smooth"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;