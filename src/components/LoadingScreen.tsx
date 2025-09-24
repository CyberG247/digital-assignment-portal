import { useEffect, useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero">
      <div className="text-center text-primary-foreground">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="animate-pulse-glow rounded-full bg-white/10 p-8 backdrop-blur-sm">
            <BookOpen className="w-16 h-16 animate-bounce-in" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 animate-bounce text-yellow-300" />
          <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 animate-bounce text-blue-300" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Title with stagger animation */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-slide-up">
          Digital Assignment Portal
        </h1>
        
        <p className="text-lg opacity-90 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Loading your learning experience...
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div 
            className="h-full bg-gradient-to-r from-blue-300 to-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm opacity-75 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;