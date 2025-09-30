import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Users, Shield, Clock, CheckCircle } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import StudentLoginForm from "@/components/StudentLoginForm";
import { useStudentAuth } from "@/contexts/StudentAuthContext";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { login } = useStudentAuth();

  const handleStudentPortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoginForm(true);
  };

  const handleLogin = (studentData: { name: string; studentId: string }) => {
    login(studentData);
    // Navigate to student dashboard after login
    window.location.href = '/student';
  };

  const features = [
    {
      icon: FileText,
      title: "Easy Submissions",
      description: "Upload assignments with drag-and-drop functionality and automatic file validation."
    },
    {
      icon: Clock,
      title: "Deadline Tracking",
      description: "Never miss a deadline with automatic notifications and visual progress indicators."
    },
    {
      icon: Users,
      title: "Teacher Tools",
      description: "Comprehensive grading system with feedback options and analytics dashboard."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "End-to-end encryption ensures your submissions and grades remain private."
    },
    {
      icon: CheckCircle,
      title: "Instant Notifications",
      description: "Real-time updates on submission status, grades, and important announcements."
    },
    {
      icon: BookOpen,
      title: "Progress Analytics",
      description: "Track performance with detailed insights and improvement recommendations."
    }
  ];

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Digital Assignment
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Submission Portal</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Streamline your academic workflow with our secure, efficient platform for assignment submissions, 
              grading, and feedback. Perfect for students and educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button 
                size="lg" 
                onClick={handleStudentPortalClick}
                className="bg-gradient-primary shadow-medium text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 animate-fade-in w-full sm:w-auto"
              >
                <FileText className="w-5 h-5 mr-2" />
                Student Portal
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
                <Link to="/teacher">
                  <Users className="w-5 h-5 mr-2" />
                  Teacher Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Why Choose EduPortal?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Built for modern education with powerful features that make assignment management effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-base sm:text-lg text-muted-foreground">Assignments Submitted</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">500+</div>
              <div className="text-base sm:text-lg text-muted-foreground">Active Teachers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">5,000+</div>
              <div className="text-base sm:text-lg text-muted-foreground">Happy Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-4">
            Ready to Transform Your Assignment Workflow?
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 px-4">
            Join thousands of educators and students who've streamlined their academic process with EduPortal.
          </p>
          <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto mx-4">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Student Login Modal */}
      <StudentLoginForm
        isOpen={showLoginForm}
        onClose={() => setShowLoginForm(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
